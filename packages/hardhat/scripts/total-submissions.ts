import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0xa05AD8C8FA9252626bcA667107E4e8eA6581bff0";

async function main() {

  const [minter] = await ethers.getSigners();

  console.log(" with the account:", minter.address);

  console.log("Account balance:", (await minter.getBalance()).toString());

  const address = CONTRACT_ADDRESS;
  const Contract = await ethers.getContractFactory('Contest');
  const contract = await Contract.attach(address);

  console.log("Contract address:", contract.address);

  // Get total tokens
  let totalSubmissions = await contract.totalSubmissions();
  console.log('Total Tokens are ', totalSubmissions.toString());
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });