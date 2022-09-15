import { ethers } from 'hardhat';
import fetch from "node-fetch";

// Our main contest contract whose vote function we call
const CONTEST_CONTRACT = "0x49E483Edc1f094A239a85396F9f99E08f5223c7C";

async function main() {
    
    const worldIDAddress = await fetch('https://developer.worldcoin.org/api/v1/contracts')
        .then(res => res.json() as Promise<{ key: string; value: string }[]>)
        .then(res => res.find(({ key }) => key === 'staging.semaphore.wld.eth').value)

    const ContractFactory = await ethers.getContractFactory('Contract')

    console.log('Deploying contract for contest:', CONTEST_CONTRACT);
    const contract = await ContractFactory.deploy(worldIDAddress, CONTEST_CONTRACT)

    await contract.deployed()

    console.log('Contract deployed to:', contract.address)
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
