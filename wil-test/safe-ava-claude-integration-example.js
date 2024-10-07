// Import necessary libraries
import Safe from '@safe-global/protocol-kit'
import { ethers } from 'ethers'
import AvaProtocol from 'ava-protocol-sdk'

// Set up provider for Rootstock
const rskProvider = new ethers.providers.JsonRpcProvider('https://public-node.rsk.co')

// Set up Safe{Core} for Rootstock
const ethAdapter = new EthersAdapter({
  ethers,
  signerOrProvider: rskProvider
})

const safeSDK = await Safe.create({ 
  ethAdapter, 
  safeAddress,
  chainId: 30 // Rootstock Mainnet chainId
})

// Set up Ava Protocol
const avaProtocol = new AvaProtocol()

// Define the smart contract function you want to automate (on Rootstock)
const smartContractAddress = '0x...' // Rootstock contract address
const smartContractABI = [...]
const smartContract = new ethers.Contract(smartContractAddress, smartContractABI, rskProvider)

// Create an automation flow in Ava Protocol
const automationFlow = avaProtocol.createFlow({
  trigger: {
    type: 'schedule',
    cron: '0 0 * * *' // Run daily at midnight
  },
  action: async () => {
    // Prepare the transaction data
    const data = smartContract.interface.encodeFunctionData('yourFunction', [param1, param2])

    // Create a Safe transaction
    const safeTransaction = await safeSDK.createTransaction({
      to: smartContractAddress,
      data,
      value: '0'
    })

    // Execute the Safe transaction
    const executeTxResponse = await safeSDK.executeTransaction(safeTransaction)
    await executeTxResponse.transactionResponse?.wait()

    console.log('Automated function executed successfully on Rootstock')
  }
})

// Activate the automation flow
await avaProtocol.activateFlow(automationFlow)
