const ethers = require('ethers');
const addresses = require('./contracts/addresses.json')
const mockToken = require('./contracts/MockToken.json')

// mumbai test-net provider
const RPC_PROVIDER = "https://speedy-nodes-nyc.moralis.io/86976c2eb2d563ed7082d7a6/polygon/mumbai";

const user = addresses.user1;

async function main() {
    // We get the contract to deploy

    const provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER);
    const wallet = new ethers.Wallet(addresses.mockTokenOwner.sk, provider);
    const MockToken = new ethers.Contract(addresses.mockTokenAddress, mockToken.abi, wallet);
    const mintAmt = 1000;
    const mockTokenInstance = await MockToken.transfer(user.pk, ethers.utils.parseEther(mintAmt.toString()), {gasLimit: 5000000}); 
    const receipt = await mockTokenInstance.wait();
    console.log("address of deployed", receipt);
    pollData(MockToken, user.pk)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

function pollData(MockToken, userAddress){
    setInterval(async ()=>{
        const bal = await MockToken.balanceOf(userAddress);
        console.log('user balance:', bal);
    }, 1000)
}