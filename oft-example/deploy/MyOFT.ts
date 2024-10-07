import assert from 'assert'

import { type DeployFunction } from 'hardhat-deploy/types'
import 'dotenv/config'


let contractName = process.env.OFT_CONTRACT_NAME;
let tokenName = process.env.TOKEN_NAME;
let tokenSymbol = process.env.TOKEN_SYMBOL;


const deploy: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments } = hre

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    assert(deployer, 'Missing named deployer account')

    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)

    if(hre.network.name == 'europa' || hre.network.name == 'europatestnet') 
    {
        contractName = process.env.ALT_OFT_CONTRACT_NAME
    }

    const endpointV2Deployment = await hre.deployments.get('EndpointV2')

    console.log(endpointV2Deployment.address);

    const { address } = await deploy(contractName, {
        from: deployer,
        args: [
            tokenName, // name
            tokenSymbol, // symbol
            endpointV2Deployment.address, // LayerZero's EndpointV2 address
            deployer, // owner
        ],
        log: true,
        skipIfAlreadyDeployed: false,
    })

    console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
}

deploy.tags = [contractName]

export default deploy
