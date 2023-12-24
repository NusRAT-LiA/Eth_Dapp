let solc = require('solc');
let fs = require('fs');

const { Web3 } = require('web3');
const { stringify } = require('querystring');
//const { contract } = require('web3/lib/commonjs/eth.exports');
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

let ABI = compilerOutput.contracts["MyToken.sol"]["MyToken"].abi;
let bytecode = compilerOutput.contracts["MyToken.sol"]["MyToken"].evm.bytecode.object;

console.log("abi: ",ABI);
console.log("bytecode :",bytecode);

let Contract = new web3.eth.Contract(ABI);
let defaultAcc;

web3.eth.getAccounts().then((accounts) => {
    defaultAcc = accounts[0];

    ContractDeploy(defaultAcc);

});

const listeners = process.listeners('unhandledRejection')
process.removeListener('unhandledRejection', listeners[listeners.length - 1])

function ContractDeploy(defaultAcc) {
    Contract.deploy({ data: bytecode, arguments:["default","$",10000] }).send({ from: defaultAcc, gas: 300000 })
        .on('receipt', (receipt) => {
            console.log("Contract Address:", receipt.contractAddress);

            // Fetch balance after deployment
            Contract.methods.balanceOf(defaultAcc)
                .call({from : defaultAcc})
                .then((balance) => {
                    console.log("Balance:", balance);
                })
                .catch((error) => {
                    console.error("Error fetching balance:", error);
                });
        })
        // .catch((error) => {
        //     console.error("Contract deployment error:", error);
        // });
}
