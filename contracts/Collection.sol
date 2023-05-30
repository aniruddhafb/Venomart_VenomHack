pragma ever-solidity >= 0.62.0;

pragma AbiHeader expire;
pragma AbiHeader time;
pragma AbiHeader pubkey;


import '@itgold/everscale-tip/contracts/TIP4_2/TIP4_2Collection.sol';
import '@itgold/everscale-tip/contracts/TIP4_3/TIP4_3Collection.sol';
import './NftBase.sol';


contract Collection is TIP4_2Collection, TIP4_3Collection {

    /**
    * Errors
    **/
    uint8 constant sender_is_not_owner = 101;
    uint8 constant value_is_less_than_required = 102;


    /// _remainOnNft - the number of crystals that will remain after the entire mint 
    /// process is completed on the Nft contract
    uint128 _remainOnNft = 0.3 ever;

    constructor(
        TvmCell codeNft, 
        TvmCell codeIndex,
        TvmCell codeIndexBasis,
        string json
    ) TIP4_1Collection (
        codeNft
    ) TIP4_2Collection (
        json
    ) TIP4_3Collection (
        codeIndex,
        codeIndexBasis
    ) public {
        tvm.accept();
    }

    function _mintNft(
        string json
    ) internal {
        require(msg.value > _remainOnNft + (2 * _indexDeployValue), value_is_less_than_required);
        /// reserve original_balance
        tvm.rawReserve(0, 4);

        uint256 id = _totalSupply;
        _totalSupply++;

        TvmCell codeNft = _buildNftCode(address(this));
        TvmCell stateNft = _buildNftState(codeNft, id);
        address nftAddr = new NftBase{
            stateInit: stateNft,
            value: 0,
            flag: 128
        }(
            msg.sender,
            msg.sender,
            _remainOnNft,
            json,
            _indexDeployValue,
            _indexDestroyValue,
            _codeIndex
        );

        emit NftCreated(
            id, 
            nftAddr,
            msg.sender,
            msg.sender, 
            msg.sender
        );
    
    }

    function _buildNftState(
        TvmCell code,
        uint256 id
    ) internal virtual override(TIP4_2Collection, TIP4_3Collection) pure returns (TvmCell) {
        return tvm.buildStateInit({
            contr: NftBase,
            varInit: {_id: id},
            code: code
        });
    }

}








// pragma ever-solidity >= 0.61.2;

// pragma AbiHeader expire;
// pragma AbiHeader time;
// pragma AbiHeader pubkey;

// import '@itgold/everscale-tip/contracts/TIP4_1/TIP4_1Collection.sol';
// import '@itgold/everscale-tip/contracts/TIP4_2/TIP4_2Collection.sol';
// import '@itgold/everscale-tip/contracts/TIP4_3/TIP4_3Collection.sol';
// import './NftBase.sol';

// contract Collection is TIP4_1Collection, TIP4_2Collection, TIP4_3Collection {

//     constructor(
//         TvmCell codeNft,
//         TvmCell codeIndex,
//         TvmCell codeIndexBasis,
//         string json
//     ) TIP4_1Collection (
//         codeNft
//     ) TIP4_2Collection (
//         json
//     ) TIP4_3Collection (
//         codeIndex,
//         codeIndexBasis
//     ) public {
//         tvm.accept();
//     }

//     function mintNft(string json) external virtual {
//         require(msg.value > 0.4 ever, 101);
//         tvm.rawReserve(0, 4);

//         uint256 id = uint256(_totalSupply);
//         _totalSupply++;

//         TvmCell codeNft = _buildNftCode(address(this));
//         TvmCell stateNft = tvm.buildStateInit({
//             contr: NftBase,
//             varInit: {_id: id},
//             code: codeNft
//         });
//         new NftBase{
//             stateInit: stateNft,
//             value: 0,
//             flag: 128
//         }(
//             msg.sender,
//             msg.sender,
//             0.3 ever,
//             json,
//             _codeIndex,
//             _indexDeployValue,
//             _indexDestroyValue
//         );     
//     }
// }