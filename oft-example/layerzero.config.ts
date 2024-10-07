import { EndpointId } from '@layerzerolabs/lz-definitions'
import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const europaTestnetContract: OmniPointHardhat = {
    eid: EndpointId.SKALE_V2_TESTNET,
    contractName: 'AltSKALEToken',
    address: '0xBFae6C0130c51669a9db88d0e487d029ee5A1c58',
}

const amoyContract: OmniPointHardhat = {
    eid: EndpointId.AMOY_V2_TESTNET,
    contractName: 'SKALEToken',
    address: '0xf8DDe18493f9B4993020914c71A17823520F33b9',
}


const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: europaTestnetContract,
        },
        {
            contract: amoyContract,
        },
    ],
    connections: [
        {
            from: europaTestnetContract,
            to: amoyContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            "0x955412c07d9bc1027eb4d481621ee063bfd9f4c6"
                        ]
                    }
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            "0x955412c07d9bc1027eb4d481621ee063bfd9f4c6"
                        ]
                    }
                }
            },
        },
        {
            from: amoyContract,
            to: europaTestnetContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            "0x55c175dd5b039331db251424538169d8495c18d1"
                        ]
                    }
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            "0x55c175dd5b039331db251424538169d8495c18d1"
                        ]
                    }
                }
            }
        }

    ],
}

export default config
