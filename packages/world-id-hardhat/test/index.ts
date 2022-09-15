import { expect } from 'chai'
import { ethers } from 'hardhat'
import { Contract } from 'ethers'
import {
    getProof,
    getRoot,
    prepareWorldID,
    registerIdentity,
    registerInvalidIdentity,
    setUpWorldID,
} from './helpers/InteractsWithWorldID'

// Our main contest contract whose vote function we call
const CONTEST_CONTRACT = "0x49E483Edc1f094A239a85396F9f99E08f5223c7C";
const TOKEN_ID_TO_VOTE = 1;

describe('Contract', function () {
    let Contract: Contract
    let callerAddr: string

    this.beforeAll(async () => {
        await prepareWorldID()
    })

    beforeEach(async () => {
        const [signer] = await ethers.getSigners()
        const worldIDAddress = await setUpWorldID()
        const ContractFactory = await ethers.getContractFactory('Contract')
        Contract = await ContractFactory.deploy(worldIDAddress, CONTEST_CONTRACT)
        await Contract.deployed()

        callerAddr = await signer.getAddress()
    })

    it('Accepts and validates calls', async function () {
        await registerIdentity()

        const [nullifierHash, proof] = await getProof(Contract.address, callerAddr)

        const tx = await Contract.verifyAndExecute(
            callerAddr,
            await getRoot(),
            nullifierHash,
            proof,
            TOKEN_ID_TO_VOTE
        )

        await tx.wait()

        // extra checks here
    })

    it('Rejects duplicated calls', async function () {
        await registerIdentity()

        const [nullifierHash, proof] = await getProof(Contract.address, callerAddr)

        const tx = await Contract.verifyAndExecute(
            callerAddr,
            await getRoot(),
            nullifierHash,
            proof,
            TOKEN_ID_TO_VOTE
        )

        await tx.wait()

        await expect(
            Contract.verifyAndExecute(callerAddr, await getRoot(), nullifierHash, proof)
        ).to.be.revertedWith('InvalidNullifier')

        // extra checks here
    })
    it('Rejects calls from non-members', async function () {
        await registerInvalidIdentity()

        const [nullifierHash, proof] = await getProof(Contract.address, callerAddr)

        await expect(
            Contract.verifyAndExecute(callerAddr, await getRoot(), nullifierHash, proof, TOKEN_ID_TO_VOTE)
        ).to.be.revertedWith('InvalidProof')

        // extra checks here
    })
    it('Rejects calls with an invalid signal', async function () {
        await registerIdentity()

        const [nullifierHash, proof] = await getProof(Contract.address, callerAddr)

        await expect(
            Contract.verifyAndExecute(Contract.address, await getRoot(), nullifierHash, proof, TOKEN_ID_TO_VOTE)
        ).to.be.revertedWith('InvalidProof')

        // extra checks here
    })
    it('Rejects calls with an invalid proof', async function () {
        await registerIdentity()

        const [nullifierHash, proof] = await getProof(Contract.address, callerAddr)
        proof[0] = (BigInt(proof[0]) ^ BigInt(42)).toString()

        await expect(
            Contract.verifyAndExecute(callerAddr, await getRoot(), nullifierHash, proof, TOKEN_ID_TO_VOTE)
        ).to.be.revertedWith('InvalidProof')

        // extra checks here
    })
})
