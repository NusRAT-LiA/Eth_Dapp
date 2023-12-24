let solc = require('solc');
let fs = require('fs');

const { Web3 } = require('web3');
const { stringify } = require('querystring');
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3 = new Web3(provider);

let contractContent = fs.readFileSync("MyToken.sol").toString();

console.log(contractContent);

let compilerInput = {
    "language": "Solidity",
    "sources": {
        "MyToken.sol": {
            "content": contractContent
        }
    },
    "settings": {
        "outputSelection": {
            "*": {
                "*": ["abi", "metadata", "evm.bytecode", "evm.deployedBytecode"]
            }
        }
    }
}

let compilerOutput = JSON.parse(solc.compile(JSON.stringify(compilerInput)));

console.log(compilerOutput);

ABI = compilerOutput.contracts["MyToken.sol"]["MyToken"].abi;
bytecode = compilerOutput.contracts["MyToken.sol"]["MyToken"].evm.bytecode.object;

console.log("abi: ",ABI);
console.log("bytecode :",bytecode);