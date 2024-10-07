import { utils } from 'ethers'
import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { Options } from '@layerzerolabs/lz-v2-utilities'


export async function BridgeToken(originContract: any, destinationContract: any, amount: string) {

    const originAddress = originContract.address
    const originTokenFactory = await hre.ethers.getContractFactory(originContract.contractName)
    const OriginContract = originTokenFactory.attach(originAddress)

    const [owner] = await hre.ethers.getSigners();    
    const address = await owner.getAddress()

   const tokensToSend = utils.parseEther(amount)
   const destinationChainId = destinationContract.eid
   const destinationAddress = address; 

   const options = Options.newOptions().addExecutorLzReceiveOption(3000000, 0).toHex().toString()

   const sendParam = [
       destinationChainId,
       utils.zeroPad(destinationAddress, 32),
       tokensToSend,
       tokensToSend,
       options,
       '0x',
       '0x',
   ]

   const [nativeFee] = await OriginContract.quoteSend(sendParam, false)
    console.log(nativeFee);
    
   if(originContract.eid == 40273) // SKALE Europa Testnet is bridge origin
    {
        // 0x6c71319b1F910Cf989AD386CcD4f8CC8573027aB -> SKL Address on Europa Testnet
        const SKLContract = await hre.ethers.getContractAt("ERC20","0x6c71319b1F910Cf989AD386CcD4f8CC8573027aB") 
        const tx_skl_approve = await SKLContract.approve(originAddress, nativeFee);
        console.log("SKL approval " )
        console.log(tx_skl_approve);

        const send_tx = await OriginContract.send(sendParam, [nativeFee, 0],destinationAddress);
        console.log(send_tx)
    }
    else if (originContract.eid == 30273) { // SKALE Europa is bridge origin

        // 0xE0595a049d02b7674572b0d59cd4880Db60EDC50 -> SKL Address on Europa
        const SKLContract = await hre.ethers.getContractAt("ERC20","0xE0595a049d02b7674572b0d59cd4880Db60EDC50")
        const tx_skl_approve = await SKLContract.approve(originAddress, nativeFee);
        console.log("SKL approval ");
        console.log(tx_skl_approve);

        const send_tx = await OriginContract.send(sendParam, [nativeFee, 0],destinationAddress);
        console.log(send_tx)
    }
    else { // Other Chains are bridge origin

        const send_tx = await OriginContract.send(sendParam, [nativeFee, 0],destinationAddress, { value: nativeFee });
        console.log(send_tx)
    }
}
