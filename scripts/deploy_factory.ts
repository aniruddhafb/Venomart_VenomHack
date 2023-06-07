import { getRandomNonce } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const pubkey = signer.publicKey;
  console.log({pubkey})
  const nftArtifacts = await locklift.factory.getContractArtifacts("Nft");
  const nftCollectionArtifacts = await locklift.factory.getContractArtifacts("NFTCollection");
  const indexArtifacts = await locklift.factory.getContractArtifacts("Index");
  const indexBasisArtifacts = await locklift.factory.getContractArtifacts("IndexBasis");

  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "CollectionFactory",
    publicKey: signer.publicKey,
    initParams: {},
    constructorParams: {
      _nft_code: nftArtifacts.code,
      _codeIndex: indexArtifacts.code,
      _codeIndexBasis: indexBasisArtifacts.code, 
      _nft_collection_code: nftCollectionArtifacts.code  
    },
    value: locklift.utils.toNano(1),
  });

  console.log(`Sample deployed at: ${sample.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
