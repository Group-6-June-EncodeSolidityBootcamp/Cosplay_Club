# Cosplay Club

![Cosplay Club](https://i.imgur.com/8A3UU3J.jpg)

Cosplay Club is a cosplay contest app where users will submit their cosplay image on the theme/topic. Judges can use our JuDAO to vote for the winner.

- Submissions & Votes will be displayed on the frontend.
- The winner will receive a special NFT Prize & Tokens.🏆💵🤑
- ✨Magic ✨


## Why?

- To demostrate how to successfully run a virtual contest on blockchain.
- Make contest judging decentralised with a DAO.
- An easy dapp for general public to get a feel of web3.

## Project Structure

- **Frontend I** - For Users (submissions, votes ...)
[packages/frontend]

- **Frontend II** - For DAO users (vote on decisions, proposals ...) 
[WIP]

- **Web Backend** (handle form submissions, uploading to ipfs ...)
[packages/backend]

- **Contract I** - ERC721 + Tokenized Ballot for contests (Image NFTs)
[packages/hardhat/contracts/Contest.sol]

- **Contract II** - For the Governance (reusable)
[packages/hardhat/contracts/JudgesDAO.sol]

- **Contract III** - ERC20 Token for voting and governance (reusable)
[packages/hardhat/contracts/JudgesToken.sol]


## Demo

🚀 link: [WIP]

## Getting Started

This project uses Yarn Workspaces, so you'll need [Yarn](https://classic.yarnpkg.com/en/docs/install)

```bash
git clone https://github.com/ChangoMan/nextjs-ethereum-starter.git
cd nextjs-ethereum-starter

yarn install

# Start up the Hardhat Network
yarn chain
```

Here we just install the npm project's dependencies, and by running `yarn chain` we spin up an instance of Hardhat Network that you can connect to using MetaMask. In a different terminal in the same directory, run:

```bash
yarn deploy
```

This will deploy the contract to Hardhat Network. After this completes run:

```bash
yarn dev
```

This will start up the Next.js development server and your site will be available at http://localhost:3000/

To interact with the local contract, be sure to switch your MetaMask Network to `Localhost 8545`
