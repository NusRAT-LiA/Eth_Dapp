const { Web3 } = require('web3');
const { Transaction } = require('ethereumjs-tx');

const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
const web3 = new Web3(provider);

web3.eth.getAccounts().then(console.log);

let sendingAddress = "0x44A1b03c7e20074AaC0b17B24314a99813924f02d";
let receivingAddress = '0x8b74bbB292631D5A01efFbA1E5bd3CF4E51210E2';
let Tnonce;
web3.eth.getTransactionCount(sendingAddress).then(nonce=>{ Tnonce=nonce})
    const rawTransaction = {
      nonce: Tnonce, // Use the fetched nonce
      gasPrice: web3.utils.toHex(20000000000),
      gasLimit: web3.utils.toHex(800000),
      to: receivingAddress,
      value: web3.utils.toHex(web3.utils.toWei('0.5', 'ether')) // Adjusted value
    }
    
    const privateKey = Buffer.from("29abf5c8bc99df911a1729ed6ff56333bc669e985ef5ee59e34dbddc4e8bfbb1", 'hex'); // sender's private key

const tx = new Transaction(rawTransaction);
tx.sign(privateKey);

const serializedTx = tx.serialize();

web3.eth.sendSignedTransaction(serializedTx)
  .on('receipt', console.log)
  .on('error', console.error);
