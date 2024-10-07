import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import layerzero_config from '../layerzero.config'
import 'dotenv/config'

import {BridgeToken} from '../scripts/bridge'
import {SetPeer} from '../scripts/setPeer'

function GetChainDetails(chain: string) {
    
    let pickedChain;

    switch(chain.toLowerCase()){
        case 'europatestnet':
            pickedChain = layerzero_config.contracts[0]
        break;
        case 'amoy':
            pickedChain = layerzero_config.contracts[1];
        break;
        default:
            throw new Error(`Unknown chain: ${chain}. Please select some other chain please or add the chain to the config files`);
    }

    return pickedChain;
}

task('setpeer', 'Set Peer')
    .addParam('origin', 'Origin Chain')
    .addParam('destination', 'Destination Chain')
    .setAction(async (taskArgs: any) => {
         
    const originDetails = GetChainDetails(taskArgs.origin)?.contract;
    const detinationDetails = GetChainDetails(taskArgs.destination)?.contract;
    
    await SetPeer(originDetails,detinationDetails)

});


task('bridge', 'Bridge Token')
    .addParam('origin', 'Origin Chain')
    .addParam('destination', 'Destination Chain')
    .addParam('amount', 'Amount to be bridged')
    .setAction(async (taskArgs: any) => {

    const originDetails = GetChainDetails(taskArgs.origin)?.contract;
    const detinationDetails = GetChainDetails(taskArgs.destination)?.contract;

    await BridgeToken(originDetails,detinationDetails,taskArgs.amount)

});
