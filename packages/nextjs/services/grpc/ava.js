import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync("../../protobuf/ava/avs.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const env = process.env.env || "development";
const privateKey = process.env.PRIVATE_KEY; // Make sure to provide your private key with or without the '0x' prefix

const config = {
  development: {
    AP_AVS_RPC: "localhost:2206",
    TEST_TRANSFER_TOKEN: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    TEST_TRANSFER_TO: "0xe0f7D11FD714674722d325Cd86062A5F1882E13a",
    ORACLE_PRICE_CONTRACT: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },

  staging: {
    AP_AVS_RPC: "aggregator-holesky.avaprotocol.org:2206",
    TEST_TRANSFER_TOKEN: "0x2e8bdb63d09ef989a0018eeb1c47ef84e3e61f7b",
    TEST_TRANSFER_TO: "0xe0f7D11FD714674722d325Cd86062A5F1882E13a",
    ORACLE_PRICE_CONTRACT: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  },

  production: {
    AP_AVS_RPC: "aggregator.avaprotocol.org:2206",
    TEST_TRANSFER_TOKEN: "0x72d587b34f7d21fbc47d55fa3d2c2609d4f25698",
    TEST_TRANSFER_TO: "0xa5ABB97A2540E4A4756E33f93fB2D7987668396a",
    ORACLE_PRICE_CONTRACT: "0x360B0a3f9Fc28Eb2426fa2391Fd2eB13912E1e40",
  },
};

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const apProto = protoDescriptor.aggregator;
const client = new apProto.Aggregator(config[env].AP_AVS_RPC, grpc.credentials.createInsecure());

function asyncRPC(client, method, request, metadata) {
  return new Promise((resolve, reject) => {
    client[method].bind(client)(request, metadata, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
}

async function signMessageWithEthers(wallet, message) {
  const signature = await wallet.signMessage(message);
  return signature;
}

async function generateApiToken() {
  // When running from frontend, we will ask user to sign this through their
  // wallet providr
  const wallet = new Wallet(privateKey);
  const owner = wallet.address;
  const expired_at = Math.floor((+new Date() / 3600) * 24);
  const message = `key request for ${wallet.address} expired at ${expired_at}`;
  const signature = await signMessageWithEthers(wallet, message);
  //console.log(`message: ${message}\nsignature: ${signature}`)

  const result = await asyncRPC(
    client,
    "GetKey",
    {
      owner,
      expired_at,
      signature,
    },
    {},
  );

  return { owner, token: result.key };
}

async function listTask(owner, token) {
  const metadata = new grpc.Metadata();
  metadata.add("authkey", token);

  const result = await asyncRPC(client, "ListTasks", {}, metadata);

  console.log("Task ID for ", owner, "\n", result);
}

async function getTask(owner, token, taskId) {
  const metadata = new grpc.Metadata();
  metadata.add("authkey", token);

  const result = await asyncRPC(client, "GetTask", { bytes: taskId }, metadata);

  console.log("Task Data for ", taskId, "\n", result);
}

async function cancel(owner, token, taskId) {
  const metadata = new grpc.Metadata();
  metadata.add("authkey", token);

  const result = await asyncRPC(client, "CancelTask", { bytes: taskId }, metadata);

  console.log("Canceled Task Data for ", taskId, "\n", result);
}

async function deleteTask(owner, token, taskId) {
  const metadata = new grpc.Metadata();
  metadata.add("authkey", token);

  const result = await asyncRPC(client, "DeleteTask", { bytes: taskId }, metadata);

  console.log("Delete Task ", taskId, "\n", result);
}

async function getWallet(owner, token) {
  const metadata = new grpc.Metadata();
  metadata.add("authkey", token);

  const result = await asyncRPC(client, "GetSmartAccountAddress", { owner: owner }, metadata);

  console.log("Smart wallet address for ", owner, "\n", result);
}

(async () => {
  // 1. Generate the api token to interact with aggregator
  const { owner, token } = await generateApiToken();

  let taskCondition = "";

  switch (process.argv[2]) {
    case "schedule":
      // ETH-USD pair on sepolia
      // https://sepolia.etherscan.io/address/0x694AA1769357215DE4FAC081bf1f309aDC325306#code
      // The price return is big.Int so we have to use the cmp function to compare
      taskCondition = `
      bigCmp(
        priceChainlink("${config[env].ORACLE_PRICE_CONTRACT}"),
        toBigInt("10000")
      ) > 0`;
      await scheduleERC20TransferJob(owner, token, taskCondition);
      break;

    case "schedule2":
      taskCondition = `bigCmp(
      priceChainlink("${config[env].ORACLE_PRICE_CONTRACT}"),
      toBigInt("99228171987813")) > 0`;
      await scheduleERC20TransferJob(owner, token, taskCondition);
      break;

    case "schedule-generic":
      // https://sepolia.etherscan.io/address/0x9aCb42Ac07C72cFc29Cd95d9DEaC807E93ada1F6#writeContract
      // This is a demo contract where we have a map of address -> number
      // we can set the value to demo that the task is trigger when the number
      // match a condition
      // When matching an arbitrary contract, the user need to provide the ABI
      // for the function they call so our task engine can unpack the result
      taskCondition = `
        bigCmp(
          readContractData(
            // Target contract address
            "0x9aCb42Ac07C72cFc29Cd95d9DEaC807E93ada1F6",
            // encoded call data for retrieve method, check getTaskDataQuery to
            // see how to generate this
            "0x0a79309b000000000000000000000000e272b72e51a5bf8cb720fc6d6df164a4d5e321c5",
            // Method call and ABI are needed so the engine can parse the result
            "retrieve",
            '[{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]'
          )[0],
          toBigInt("2000")
        ) > 0`;
      await scheduleERC20TransferJob(owner, token, taskCondition);
      break;

    case "tasks":
      await listTask(owner, token);
      break;

    case "get":
      await getTask(owner, token, process.argv[3]);
      break;

    case "cancel":
      await cancel(owner, token, process.argv[3]);
      break;
    case "delete":
      await deleteTask(owner, token, process.argv[3]);
      break;

    case "wallet":
      await getWallet(owner, token);
      break;

    case "genTaskData":
      console.log("pack contract call", getTaskDataQuery(owner));
      break;

    case "time-schedule":
      await scheduleTimeTransfer(owner, token);
      break;

    default:
      console.log(`Usage:

      wallet:           to find smart wallet address for this eoa
      tasks:            to find all tasks
      get <task-id>:    to get task detail
      schedule:         to schedule a task with chainlink eth-usd its condition will be matched quickly
      schedule2:        to schedule a task with chainlink that has a very high price target
      schedule-generic: to schedule a task with an arbitrary contract query
      cancel <task-id>: to cancel a task
      delete <task-id>: to completely remove a task`);
  }
})();

function getTaskData() {
  const ABI = ["function transfer(address to, uint amount)"];
  const iface = new ethers.Interface(ABI);
  return iface.encodeFunctionData("transfer", [config[env].TEST_TRANSFER_TO, ethers.parseUnits("12", 18)]);
}

function getTaskDataQuery(owner) {
  const ABI = ["function retrieve(address addr) public view returns (uint256)"];
  const iface = new ethers.Interface(ABI);
  return iface.encodeFunctionData("retrieve", [owner]);
}

async function scheduleERC20TransferJob(owner, token, taskCondition) {
  // Now we can schedule a task
  // 1. Generate the calldata to check condition
  const taskBody = getTaskData();
  console.log("\n\nTask body:", taskBody);

  console.log("\n\nTask condition:", taskCondition);

  const metadata = new grpc.Metadata();
  metadata.add("authkey", token);

  console.log("Trigger type", TriggerType.EXPRESSIONTRIGGER);

  const result = await asyncRPC(
    client,
    "CreateTask",
    {
      // A contract execution will be perform for this taks
      task_type: TaskType.CONTRACTEXECUTIONTASK,

      action: {
        contract_execution: {
          // Our ERC20 test token
          contract_address: config[env].TEST_TRANSFER_TOKEN,
          calldata: taskBody,
        },
      },

      trigger: {
        trigger_type: TriggerType.EXPRESSIONTRIGGER,
        expression: {
          expression: taskCondition,
        },
      },

      start_at: Math.floor(Date.now() / 1000) + 30,
      expired_at: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
      memo: `Demo Example task for ${owner}`,
    },
    metadata,
  );

  console.log("Expression Task ID is:", result);
}

async function scheduleTimeTransfer(owner, token) {
  // Now we can schedule a task
  // 1. Generate the calldata to check condition
  const taskBody = getTaskData();
  console.log("\n\nTask body:", taskBody);
  console.log("\n\nTask condition: Timeschedule", "*/2");

  const metadata = new grpc.Metadata();
  metadata.add("authkey", token);

  console.log("Trigger type", TriggerType.TIMETRIGGER);

  const result = await asyncRPC(
    client,
    "CreateTask",
    {
      // A contract execution will be perform for this taks
      task_type: TaskType.CONTRACTEXECUTIONTASK,

      action: {
        contract_execution: {
          // Our ERC20 test token deploy on sepolia
          // https://sepolia.etherscan.io/token/0x69256ca54e6296e460dec7b29b7dcd97b81a3d55#code
          contract_address: config[env].TEST_TRANSFER_TOKEN,
          calldata: taskBody,
        },
      },

      trigger: {
        trigger_type: TriggerType.TIMETRIGGER,
        schedule: {
          cron: "*/2 * * * *",
        },
      },

      start_at: Math.floor(Date.now() / 1000) + 30,
      expired_at: Math.floor(Date.now() / 1000 + 3600 * 24 * 30),
      memo: `Demo Example task for ${owner}`,
    },
    metadata,
  );

  console.log("Expression Task ID is:", result);
}
