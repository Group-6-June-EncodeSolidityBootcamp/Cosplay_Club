// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { Contract } from 'ethers';
import { config, ethers } from 'hardhat';
import fs from 'fs';

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  if (fs.existsSync(`${config.paths.artifacts}/contracts/contractAddress.ts`)) {
    fs.unlinkSync(`${config.paths.artifacts}/contracts/contractAddress.ts`);
  }

  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  // deploying token contract
  console.log('1. Deploying token contract...');
  const JudgesToken = await ethers.getContractFactory('JudgesToken');
  const judgesToken = await JudgesToken.deploy();
  await judgesToken.deployed();
  saveFrontendFiles(judgesToken, "JudgesToken");
  console.log('JudgesToken deployed to:', judgesToken.address);

  // deploying DAO contract
  console.log('2. Deploying DAO contract...');
  const JudgesDAO = await ethers.getContractFactory('JudgesDAO');
  const judgesDAO = await JudgesDAO.deploy(judgesToken.address);
  await judgesDAO.deployed();
  saveFrontendFiles(judgesDAO, "JudgesDAO");
  console.log('JudgesDAO deployed to:', judgesDAO.address);

  // deploying contest contract
  console.log('3. Deploying Contest contract...');
  const Contest = await ethers.getContractFactory('Contest');
  const contest = await Contest.deploy();
  await contest.deployed();
  saveFrontendFiles(contest, "Contest");
  console.log('Contest deployed to:', contest.address);


}

// https://github.com/nomiclabs/hardhat-hackathon-boilerplate/blob/master/scripts/deploy.js
function saveFrontendFiles(contract: Contract, contractName: string) {
  fs.appendFileSync(
    `${config.paths.artifacts}/contracts/contractAddress.ts`,
    `export const ${contractName} = '${contract.address}'\n`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
