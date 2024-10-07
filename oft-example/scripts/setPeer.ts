import { utils } from 'ethers'


export async function SetPeer(originContract: any, peerContract: any) {

    const target_address = originContract.address;
    const peer_address = peerContract.address;

    const TestTokenFactory = await hre.ethers.getContractFactory(originContract.contractName)

    const TokenContract = TestTokenFactory.attach(target_address)
    const peerAddress = utils.zeroPad(peer_address, 32)

    const peerChainId = peerContract.eid

    console.log(`Setting peer on ${peerChainId} to ${peerAddress}`)
    await TokenContract.setPeer(peerChainId, peerAddress)

    console.log('Peer set!')
}
