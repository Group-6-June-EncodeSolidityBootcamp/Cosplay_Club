import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x49E483Edc1f094A239a85396F9f99E08f5223c7C";
const WORLDID_CONTRACT_ADDRESS = "0xa05AD8C8FA9252626bcA667107E4e8eA6581bff0";

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