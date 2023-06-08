pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./NFTContract.sol";

pragma AbiHeader pubkey;

contract CollectionFactory  {

    uint256 private collectionId;
    NFTCollection private nftMarketplace;
    TvmCell nft_code;
    TvmCell codeIndex;
    TvmCell codeIndexBasis;
    TvmCell nft_collection_code;

    address owner;

     struct Collection{
        uint256 collectionId;
        string json;
        address owner;
        address collection_address; 
    }

    event CollectionCreated (
        uint256 collectionId,
        string json,
        address owner,
        address collection_address
    );
    
    mapping(address => Collection[]) private userToCollections;
    mapping(uint256 => Collection) private idToCollection;
    uint8 constant value_is_less_than_required = 102;
    uint128 _remainOnNft = 0.3 ever;

    constructor(
        TvmCell _nft_code,
        TvmCell _codeIndex,
        TvmCell _codeIndexBasis,
        TvmCell _nft_collection_code       
    ) public{
        tvm.accept();
        
        nft_code = _nft_code;
        codeIndex = _codeIndex;
        codeIndexBasis = _codeIndexBasis;
        nft_collection_code = _nft_collection_code;
        owner = msg.sender;
    }

    function create_collection(
        uint _state,
        string _json
    ) public {
        require(msg.value > _remainOnNft);

        uint256 collectionCount = collectionId;
        tvm.rawReserve(0, 4);

        TvmCell stateCol = tvm.buildStateInit({
            contr: NFTContract,
            varInit: {owner: msg.sender},
            code: nft_collection_code
        });

        address new_nft_collection = new NFTContract{    
            stateInit: stateCol,
            value: 0,
            flag: 128
        }(_state, nft_code, codeIndex, codeIndexBasis, _json);

        // Collection newCollection = Collection(
        //     collectionId,
        //     _json,
        //     msg.sender,
        //     new_nft_collection
        // );

        emit CollectionCreated(
            collectionId,
            _json,
            msg.sender,
            new_nft_collection
        );

        // userToCollections[msg.sender].push(newCollection);
        // idToCollection[collectionCount] = newCollection;
        collectionId++;        
    }

    function getAllCollections() public view returns(Collection[] ) {
        uint256 collectionCount = collectionId;
        Collection[]  collections = new Collection[](collectionCount);
        // require(collectionCount >= 0, "you have not created any collection");
        for(uint256 i = 0; i < collectionCount; i++){
            Collection current_collection = idToCollection[i];
            collections[i] = current_collection;
        }
        return collections;
    }
    
    function getCollectionById(uint256 collection_id) public view returns (Collection ) {
        return idToCollection[collection_id];
    }

    function getMyCollections() public view returns (Collection[] ){
        uint256 collectionCount = collectionId;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for(uint256 i = 0; i< collectionCount; i++){
            if(idToCollection[i].owner == msg.sender){
                itemCount += 1;
            }
        }

        Collection[]  collections = new Collection[](itemCount);
        for(uint256 i = 0; i < collectionCount; i++){
            if(idToCollection[i].owner == msg.sender){
                Collection collection = idToCollection[i];
                collections[currentIndex] = collection;   
                currentIndex += 1;       
            }
        }
        return collections;
    }


}