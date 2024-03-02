const hre = require("hardhat");
const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

//provider - Alchemy
const alchemyProvider = new hre.ethers.providers.AlchemyProvider(
    (network = "goerli"),
    API_KEY
  );
  
  //Signer - your account
  const signer = new hre.ethers.Wallet(PRIVATE_KEY, alchemyProvider);
  
  //contract instance
  const helloWorldContract = new hre.ethers.Contract(
    CONTRACT_ADDRESS,
    contract.abi,
    signer
  );

async function main(){
    await hre.run('compile');

    const args = process.argv;

    if(args.length != 3){
        console.log("Provide a message argumnet (in single quotes)")
        process.exit(0);
    }

    const new_message_arg = args[2];
    const message = await helloWorldContract.message();
    console.log("The message  is currently: ", message);

    console.log("The message  is updating...");

    const tx = await helloWorldContract.update(new_message_arg);
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log("The message has been updated to " + newMessage);

}

main().catch((error)=>
{console.log(error)
process.exitCode=1
});