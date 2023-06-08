pragma ever-solidity >= 0.62.0;

pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;


import '@itgold/everscale-tip/contracts/TIP4_1/TIP4_1Nft.sol';
import '@itgold/everscale-tip/contracts/TIP4_2/TIP4_2Nft.sol';
import '@itgold/everscale-tip/contracts/TIP4_3/TIP4_3Nft.sol';


contract NftBase is TIP4_1Nft, TIP4_2Nft, TIP4_3Nft {

    constructor(
        address owner,
        address sendGasTo,
        uint128 remainOnNft,
        string json,
        uint128 indexDeployValue,
        uint128 indexDestroyValue,
        TvmCell codeIndex
    ) TIP4_1Nft(
        owner,
        sendGasTo,
        remainOnNft
    ) TIP4_2Nft (
        json
    ) TIP4_3Nft (
        indexDeployValue,
        indexDestroyValue,
        codeIndex
    ) public {
        tvm.accept();
    }

    function _beforeTransfer(
        address to, 
        address sendGasTo, 
        mapping(address => CallbackParams) callbacks
    ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
        TIP4_3Nft._beforeTransfer(to, sendGasTo, callbacks);
    }   

    function _afterTransfer(
        address to, 
        address sendGasTo, 
        mapping(address => CallbackParams) callbacks
    ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
        TIP4_3Nft._afterTransfer(to, sendGasTo, callbacks);
    }   

    function _beforeChangeOwner(
        address oldOwner, 
        address newOwner,
        address sendGasTo, 
        mapping(address => CallbackParams) callbacks
    ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
        TIP4_3Nft._beforeChangeOwner(oldOwner, newOwner, sendGasTo, callbacks);
    }   

    function _afterChangeOwner(
        address oldOwner, 
        address newOwner,
        address sendGasTo, 
        mapping(address => CallbackParams) callbacks
    ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
        TIP4_3Nft._afterChangeOwner(oldOwner, newOwner, sendGasTo, callbacks);
    }

}







// pragma ever-solidity >= 0.61.2;
// pragma AbiHeader expire;
// pragma AbiHeader pubkey;

// // importing all standards bases
// import '@itgold/everscale-tip/contracts/TIP4_1/TIP4_1Nft.sol';
// import '@itgold/everscale-tip/contracts/TIP4_2/TIP4_2Nft.sol';
// import '@itgold/everscale-tip/contracts/TIP4_3/TIP4_3Nft.sol';


// contract NftBase is TIP4_1Nft, TIP4_2Nft, TIP4_3Nft {

//     // just call constructors of all implemented classes
//     constructor(
//         address owner,
//         address sendGasTo,
//         uint128 remainOnNft,
//         string json, // for TIP-4.2
//         TvmCell codeIndex, // for TIP-4.3
//         uint128 indexDeployValue, // for TIP-4.3
//         uint128 indexDestroyValue // for TIP-4.3
//     ) TIP4_1Nft(
//         owner,  
//         sendGasTo,
//         remainOnNft
//     ) TIP4_2Nft (
//         json
//     ) TIP4_3Nft (
//         indexDeployValue,
//         indexDestroyValue,
//         codeIndex
//     ) 
//     public {
//         tvm.accept();        
//     }

//     // Also, you need to implement some handlers, linked with NFT transferring
//     // Maybe you need to implement something special, but you can also use default handlers
    
//     function _beforeTransfer(
//         address to, 
//         address sendGasTo, 
//         mapping(address => CallbackParams) callbacks
//     ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
//         TIP4_3Nft._destructIndex(sendGasTo);
//     }

//     function _afterTransfer(
//         address to, 
//         address sendGasTo, 
//         mapping(address => CallbackParams) callbacks
//     ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
//         TIP4_3Nft._deployIndex();
//     }

//     function _beforeChangeOwner(
//         address oldOwner, 
//         address newOwner,
//         address sendGasTo, 
//         mapping(address => CallbackParams) callbacks
//     ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
//         TIP4_3Nft._destructIndex(sendGasTo);
//     }   

//     function _afterChangeOwner(
//         address oldOwner, 
//         address newOwner,
//         address sendGasTo, 
//         mapping(address => CallbackParams) callbacks
//     ) internal virtual override(TIP4_1Nft, TIP4_3Nft) {
//         TIP4_3Nft._deployIndex();
//     }

// }