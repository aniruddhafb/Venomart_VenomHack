import { getRandomNonce } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  console.log({signer})
  const nftArtifacts = await locklift.factory.getContractArtifacts("Nft");
  const indexArtifacts = await locklift.factory.getContractArtifacts("Index");
  const indexBasisArtifacts = await locklift.factory.getContractArtifacts("IndexBasis");
  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "Sample",
    publicKey: signer.publicKey,
    initParams: {
      nounce: getRandomNonce(),
      owner: `0x${signer.publicKey}`
    },
    constructorParams: {
        _state: 1,
        codeNft: nftArtifacts.code,
        codeIndex: indexArtifacts.code,
        codeIndexBasis: indexBasisArtifacts.code,
        json: `{"collection":"tutorial"}` // EXAMPLE...not by TIP-4.2
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
