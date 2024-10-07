// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { OFTAlt } from "./Alt-OFT/OFTAlt.sol";

contract AltSKALEToken is OFTAlt {
    constructor(
        string memory _name,
        string memory _symbol,
        address _lzEndpoint,
        address _delegate
    ) OFTAlt(_name, _symbol, _lzEndpoint, _delegate){
        _mint(msg.sender,1000 * 10 ** decimals());
    }
}
