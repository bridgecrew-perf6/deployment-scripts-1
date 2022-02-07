const ethers = require('ethers');
const addresses = require('./contracts/addresses.json')
const multiPay = require('./contracts/BargoMultiPay.json')

// mumbai test-net provider
const RPC_PROVIDER = "https://speedy-nodes-nyc.moralis.io/86976c2eb2d563ed7082d7a6/polygon/mumbai";

async function main() {
    // We get the contract to deploy

    const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER);
    const wallet = new ethers.Wallet(addresses.multiPayOwner.sk, provider);
    const MultiPay = new ethers.ContractFactory(multiPay.abi, multiPay.bytecode, wallet);
    
    const multiPayInstance = await MultiPay.deploy({gasLimit: 5000000});
    console.log(multiPayInstance)
    console.log("address of deployed", multiPayInstance.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });