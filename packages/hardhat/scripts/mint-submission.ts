import { ethers } from "hardhat";

const CONTRACT_ADDRESS = "0x49E483Edc1f094A239a85396F9f99E08f5223c7C";
const TO_MINT_TOKEN_URI = "https://starwars-cosplayclub.glitch.me/nft/token";

async function main() {

  const [minter] = await ethers.getSigners();

  console.log("Minting with the account:", minter.address);

  console.log("Account balance:", (await minter.getBalance()).toString());

  const address = CONTRACT_ADDRESS;
  const Contract = await ethers.getContractFactory('Contest');
  const contract = await Contract.attach(address);

  console.log("Contract address:", contract.address);

  // Get total tokens
  let totalSubmissions = await contract.totalSubmissions();
  console.log('Total Tokens was ', totalSubmissions.toString());
  
  // Send transactions to mint
    const toMintTokenURI = TO_MINT_TOKEN_URI + totalSubmissions;
    const tx = await contract.submitItem(toMintTokenURI);
    await tx.wait()
    console.log(`Minted ${toMintTokenURI} to ${minter.address}`);
    console.log(`Transaction hash: ${tx.hash}`);


  // Get total tokens again
  totalSubmissions = await contract.totalSubmissions();
  console.log('Total Tokens is now ', totalSubmissions.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });