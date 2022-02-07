const ethers = require('ethers');
const addresses = require('./contracts/addresses.json')
const mockToken = require('./contracts/MockToken.json')

// mumbai test-net provider
const RPC_PROVIDER = "https://speedy-nodes-nyc.moralis.io/86976c2eb2d563ed7082d7a6/polygon/mumbai";

async function main() {
    // We get the contract to deploy

    const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER);
    const wallet = new ethers.Wallet(addresses.mockTokenOwner.sk, provider);
    const MockToken = new ethers.ContractFactory(mockToken.abi, mockToken.bytecode, wallet);


    const supply = 1000000000;

    const mockTokenInstance = await MockToken.deploy("USD", "$", addresses.mockTokenOwner.pk, ethers.utils.parseEther(supply
      .toString()), {gasLimit: 5000000}); 

    console.log("address of deployed", mockTokenInstance.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });