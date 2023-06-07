pragma ever-solidity >= 0.61.2;
pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./NFTCollection.sol";
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
        string name;
        string symbol;
        string description;
        string image;
        string logo;
        address owner;
        NFTCollection collection_address; 
    }

    event CollectionCreated (
        uint256 collectionId,
        string name,
        string symbol,
        string description,
        string image,
        string logo,
        address owner,
        NFTCollection collection_address
    );

    
    mapping(address => Collection[]) private userToCollections;
    mapping(uint256 => Collection) private idToCollection;

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
        _nft_collection_code = _nft_collection_code;
        owner = msg.sender;
    }

    function create_collection(
        string json,
        string  collection_name,
        string  collection_symbol,
        string  collection_image,
        string  collection_logo,
        string  collection_description
    ) public {
        uint256 collectionCount = collectionId;
        
        TvmCell stateCol = tvm.buildStateInit({
            contr: NFTCollection,
            varInit: {},
            code: nft_collection_code
        });

        NFTCollection new_nft_collection = new NFTCollection{    
            stateInit: stateCol,
            value: 1,
            flag: 1 
        }(nft_code, codeIndex, codeIndexBasis, json);

        emit CollectionCreated(
            collectionCount,
            collection_name,
            collection_symbol,
            collection_description,
            collection_image,
            collection_logo,
            msg.sender,
            new_nft_collection
            );
        
        Collection  newCollection = Collection(
            collectionCount,
            collection_name,
            collection_symbol,
            collection_description,
            collection_image,
            collection_logo,
            msg.sender,
            new_nft_collection
        );

        userToCollections[msg.sender].push(newCollection);
        idToCollection[collectionCount] = newCollection;
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