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

Explore the packages folder. Set up your .env files.

To deploy contracts:

```bash
cd packages/hardhat
npm install
npx hardhat run scripts/deploy.ts --network mumbai
```

For frontends:
(Make sure your contract addresses and ABIs are in place.)
```bash
cd packages/frontend
npm install
npm start
```

To set the world id contract address to the contest contract:
- first deploy contest contract, copy the contract address and set it to CONTRACT ADDRESS on scripts in the scripts folder both in hardhat and worldid-hardhat folders.
- Then, deploy the world id contract, copy the address and set it to the WORLDID_CONTRACT_ADDRESS in `hardhat/scripts/set-worldid.ts` and then run:
```bash
cd packages/hardhat
npx hardhat run scripts/set-worldid.ts --network mumbai  
```
