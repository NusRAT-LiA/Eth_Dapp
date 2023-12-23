const { Web3 } = require('web3');
//const { Transaction } = require('ethereumjs-tx');

const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3 = new Web3(provider);

//web3.eth.getAccounts().then(console.log);

let sendingAddress = "0xBECC18708d8e9AC6A1387D4880CCE539DFE3A288";
let receivingAddress = '0xBa234fd3C6CDfE3e0527054256f0B28297F680Ca';

let transactionObject = {
  from: sendingAddress,
  to: receivingAddress, // This could be left undefined for contract creation
  value: web3.utils.toWei('1', 'ether'), // Value in Ether (converted to wei)
  gas: 2000000, // Amount of gas to use
  gasPrice: web3.utils.toWei('10', 'gwei'), // Gas price in Gwei (converted to wei)
 // data: '0xAbiByteString', // Function call data or initialization code (optional)
  nonce: 0 // Nonce (optional)
  // Other properties like accessList, type, maxFeePerGas, etc., could be added if needed
};

// Example of sending the transaction
web3.eth.sendTransaction(transactionObject)
  .then(receipt => {
    console.log('Transaction receipt:', receipt);
  })
  .catch(error => {
    console.error('Error sending transaction:', error);
  });

// let Tnonce=12;
//     const rawTransaction = {
//       nonce: Tnonce, // Use the fetched nonce
//       gasPrice: web3.utils.toHex(20000000000),
//       gasLimit: web3.utils.toHex(6721975),
//       to: receivingAddress,
//       value: web3.utils.toHex(web3.utils.toWei('0.5', 'ether')),
//       data:"0x7f7465737432000000000000000000000000000000000000000000000000000000600057" // Adjusted value
//     }
    
//     const privateKey = Buffer.from("29abf5c8bc99df911a1729ed6ff56333bc669e985ef5ee59e34dbddc4e8bfbb1", 'hex'); // sender's private key

// const tx = new Transaction(rawTransaction);
// tx.sign(privateKey);

// const serializedTx = tx.serialize();

// web3.eth.sendSignedTransaction(serializedTx)
