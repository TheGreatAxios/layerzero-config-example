# New ERC-20 Bridge

This example shows how to bridge newly created ERC-20 token between SKALE Europa and any other chain supported by LayerZero.

## Bridge step-by-step

#### 1. Installing dependencies

```bash
pnpm install
```

#### 2. Setup .env file

- Rename `.env.example` -> `.env`
- Choose your preferred means of setting up your deployer wallet/account => `MNEMONIC` or `PRIVATE_KEY`
- Set the RPCs you plan to use
- Set the correct contract names
- Set the token and symbol names

#### 3. Contracts deployment

> [!IMPORTANT] 
> The native gas token on SKALE chains, [sFUEL](https://docs.skale.space/learn/beginner/skale-chain-gas) , has no economic value, so the LayerZero team's endpoint contract is modified to accept bridge fee payments in a different token. The chosen token for this purpose was the the SKL token. As a result, any new OFT token created on a SKALE chain must extend the [OFTAlt contract](https://docs.layerzero.network/v2/developers/evm/oft/oft-patterns-extensions#oft-alt)

> [!NOTE]  
> If you require SKL testnet tokens please reach out to the SKALE team

```bash
npx hardhat lz:deploy
```

#### 4. layerzero.config file configuration

- Create a `OmniPointHardhat` object for the different contracts of each chain
- Set the correct `eid`, `contractName` and `address`
- Add to the config object the required contract objects

#### 5. Operations.ts configuration

- Add to the `GetChainDetails` function any new chains being used 

#### 6. Set peer

- Once OFT configuration is finished, it's required to open the messaging channel and connect the created OFT deployment to different chains by calling setPeer.

**Generic Example**
```
npx hardhat setpeer --origin <origin_chain_name> --destination <destination_chain_name> --network <chain_where_tx_will_be_initiated>
```
**Amoy to Europa Example**
```
npx hardhat setpeer --origin amoy --destination europatestnet --network amoy  
``` 

#### 7. Bridge 

- If peer was set successfully the bridging of assets can be iniated

**Generic Example**
```
npx hardhat bridge --origin <origin_chain_name> --destination <destination_chain_name> --amount <amount_to_bridge> --network <chain_where_tx_will_be_initiated>
```

**Bridge 3 ERC-20 from Amoy to Europa Example**
```
npx hardhat bridge --origin amoy --destination europatestnet --amount 3 --network amoy
```

> [!IMPORTANT] 
> Bridging an asset has a cost that is paid on the origing chain of the bridging transaction. 
> If the bridging origing chain is not a SKALE chain the bridging fee will be paid with the native gas token of the chain
> If the bridging origin chain is a SKALE chain the bridging fee will be paid in SKL tokens 


> [!WARNING]  
> If facing the error: `Missing revert data in call exception; Transaction reverted without a reason string`
> <details><summary> Solution</summary> 
> 
> 1. Check the required [LayerZero DVNs](https://docs.layerzero.network/v2/developers/evm/technical-reference/dvn-addresses)
> 1. Set the correct connections and DVNs on the `const config: OAppOmniGraphHardhat` object  
> 2. Run the command:  
> ```bash
> npx hardhat lz:oapp:wire --oapp-config layerzero.config.ts --safe
> ```
> </details>


