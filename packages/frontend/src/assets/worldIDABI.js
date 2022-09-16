const worldIDABI = [
    {
      "inputs": [
        {
          "internalType": "contract IWorldID",
          "name": "_worldId",
          "type": "address"
        },
        {
          "internalType": "contract ContestContract",
          "name": "_contestContract",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "InvalidNullifier",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "input",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "root",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "nullifierHash",
          "type": "uint256"
        },
        {
          "internalType": "uint256[8]",
          "name": "proof",
          "type": "uint256[8]"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "verifyAndExecute",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
