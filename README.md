# 🏗 DAO-Tao

🧪 DAO-Tao is an advanced toolkit for building and managing decentralized autonomous organizations (DAOs) across multiple blockchains. It leverages AI and automation to streamline decision-making and governance processes.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with DAO-Tao, follow the steps below:

1. Clone this repo & install dependencies

```sh
git clone https://github.com/daotao/daotao.git
cd daotao
yarn install
```

2. Run a local network in the first terminal:

```sh
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in hardhat.config.ts.

3. On a second terminal, deploy the test contract:

```sh
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in packages/hardhat/contracts and can be modified to suit your needs. The yarn deploy command uses the deploy script located in packages/hardhat/deploy to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```sh
yarn start
```

Visit your app on: http://localhost:3000. You can interact with your smart contract using the Debug Contracts page. You can tweak the app config in packages/nextjs/scaffold.config.ts.

## What's next

- Edit your smart contract YourContract.sol in packages/hardhat/contracts
- Edit your frontend homepage at packages/nextjs/app/page.tsx. For guidance on routing and configuring pages/layouts checkout the Next.js documentation.
- Edit your deployment scripts in packages/hardhat/deploy
- Edit your smart contract test in: packages/hardhat/test. To run test use yarn hardhat:test

## Features

### Revolutionize Your DAO Governance with AI & Automation

- Real-time Updates: Get real-time updates on DAO proposals directly in your inbox, powered by our AI engine.
- Cross-Chain Management: Manage governance and voting across multiple blockchain networks seamlessly.
- AI-Powered Insights: Our AI analyzes proposals and suggests the best actions to simplify decision-making.
- Secure Voting: Cast your vote safely and securely with automated smart contract interactions.

## How It Works

- Connect Your Wallet: Securely connect your Web3 wallet to start.
- Choose DAOs: Select the DAOs you’re interested in from a list of cross-chain DAOs.
- Receive Notifications: Get real-time proposal notifications and view detailed insights powered by AI.
- Vote Easily: Vote directly from our platform with one click. Safe and automated.

## Use Cases

- Cross-Chain Governance: Govern DAOs across Ethereum, Binance Smart Chain, and more.
- Automated Proposal Management: Track and manage hundreds of DAO proposals automatically.
- Secure Community Voting: Enable community voting with secure, automated processes.

