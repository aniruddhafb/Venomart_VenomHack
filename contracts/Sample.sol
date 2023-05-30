pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./Collection.sol";
contract Sample is Collection {
    uint static nounce;
    uint static owner;
    uint state;

    event StateChange(uint _state);

    constructor(
        uint _state,
        TvmCell codeNft,
        TvmCell codeIndex,
        TvmCell codeIndexBasis,
        string json
        ) Collection(codeNft, codeIndex, codeIndexBasis, json) public {
        tvm.accept();

        setState(_state);
    }

    function mintNft(string json) public {
        _mintNft(json);
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
