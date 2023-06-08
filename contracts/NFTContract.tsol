pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./NFTCollection.sol";

contract NFTContract is NFTCollection {
    uint static nounce;
    address static owner;
    uint state;

    event StateChange(uint _state);

    event tokenCreated(
        string tokenURI,
        uint256 tokenId
    );

    constructor(
        uint _state,
        TvmCell codeNft,
        TvmCell codeIndex,
        TvmCell codeIndexBasis,
        string json
        ) NFTCollection(codeNft, codeIndex, codeIndexBasis, json) public {
        tvm.accept();

        setState(_state);
    }

    function mintNft(string json) public {
        _mintNft(json);
        emit tokenCreated(
            json,
            _totalSupply
        );
    }

    function setState(uint _state) public {
        tvm.accept();
        state = _state;

        emit StateChange(_state);
    }

    function getDetails()
        external
        view
    returns (
        uint _state
    ) {
        return state;
    }
}
