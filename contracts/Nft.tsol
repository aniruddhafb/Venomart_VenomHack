pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./NftBase.sol";

contract Nft is NftBase{

    constructor(
        address owner,
        address sendGasTo,
        uint128 remainOnNft,
        string json, // for TIP-4.2
        uint128 indexDeployValue, // for TIP-4.3
        uint128 indexDestroyValue, // for TIP-4.3
        TvmCell codeIndex // for TIP-4.3
    ) NftBase (owner, sendGasTo, remainOnNft, json, indexDeployValue, indexDestroyValue, codeIndex) public {
        
    }

}