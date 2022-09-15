# Cosplay Club

![Cosplay Club](https://i.imgur.com/8A3UU3J.jpg)

Cosplay Club conducts cosplay contests where users can submit their cosplay image on the theme/topic. Judges can use our ERC20 tokens to vote for the winner. A DAO is set up for admin actions like burning an inappropriate submission, closing the voting, etc.

- Submissions & Votes will be displayed on the frontend.
- Submissions are NFT.
- Anybody can vote! But only one per human.
- The winner will receive a special NFT Prize & Tokens.🏆💵🤑
- DAO with owner role for admin actions.
- ✨Magic ✨

**v0.2 changes:**
- We're using **WORLD ID**; Voting is now more democratic, Anyone can vote! but you'll have to verify with WORLD ID to prove that you are human and are voting only once. No cheating 👮‍♀️.

## Live Demo (on goerli)

🚀 link: [starwars-cosplayclub.netlify.app](https://starwars-cosplayclub.netlify.app/)



## Why?

- To demostrate how to successfully run a virtual contest on blockchain.
- Make contest judging truly democratic and decentralised.
- An easy dapp for general public to get a feel of web3.

## Project Structure

- **Frontend I** - For Users (submissions, votes ...)
React [packages/frontend]

- **Frontend II** - For DAO users (vote on decisions, proposals ...) 
[WIP]

- **Web Backend** (handle form submissions, uploading to ipfs ...)
Express [packages/backend]

- **Contract I** - ERC721 + Tokenized Ballot for contests (Image NFTs)
Solidity [packages/hardhat/contracts/Contest.sol]

- **Contract II** - For the Governance (reusable)
Solidity [packages/hardhat/contracts/JudgesDAO.sol]

- **Contract III** - ERC20 Token for governance (reusable)
Solidity [packages/hardhat/contracts/JudgesToken.sol]

- **World ID Contract III** - For verifying personhood (reusable)
Solidity [packages/world-id-hardhat/contracts/Contract.sol]


## Moving Forward

- Finish submission functions.
- Frontend for DAO
- Web tool to generate contest instances

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
