import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x77BEcbBbd929c10de37573b109048a3Eb2154c50";
const WORLDID_CONTRACT_ADDRESS = "0x4311d6b0c0973317F47dDCB5aA34Ea6058dbC3a8";

async function main() {

  const [minter] = await ethers.getSigners();

  console.log("account:", minter.address);

  console.log("Account balance:", (await minter.getBalance()).toString());

  const address = CONTRACT_ADDRESS;
  const Contract = await ethers.getContractFactory('Contest');
  const contract = await Contract.attach(address);

  console.log("Contract address:", contract.address);
  console.log("Setting WORLD ID Contract address:", WORLDID_CONTRACT_ADDRESS);

  // Send transaction to set world id contract
    const tx = await contract.setWorldIdContract(WORLDID_CONTRACT_ADDRESS);
    await tx.wait()
    console.log(`Done! Transaction hash: ${tx.hash}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });