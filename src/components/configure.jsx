// import { VenomConnect } from "venom-connect";
// import { ProviderRpcClient } from "everscale-inpage-provider";

// import {
//   EverWalletAccount,
//   EverscaleStandaloneClient,
//   SimpleKeystore,
// } from "everscale-standalone-client";

// export const initVenomConnect = async () => {
//   const eas = await EverWalletAccount.fromPubkey({
//     publicKey:
//       "4f123dd589cc2a899f125f387022dfcda80fb5fa142df9e935922d03c5da4244",
//   });

//   const sks = new SimpleKeystore();
//   sks.addKeyPair(
//     "4f123dd589cc2a899f125f387022dfcda80fb5fa142df9e935922d03c5da4244",
//     {
//       publicKey:
//         "4f123dd589cc2a899f125f387022dfcda80fb5fa142df9e935922d03c5da4244",
//       secretKey:
//         "naive talent fork license vacuum rocket slot auction ability birth police wheat",
//     }
//   );

//   return new VenomConnect({
//     theme: "dark",
//     checkNetworkId: 1002,
//     checkNetworkName: "Venom Devnet",
//     providersOptions: {
//       venomwallet: {
//         walletWaysToConnect: [
//           {
//             package: ProviderRpcClient,
//             packageOptions: {
//               fallback:
//                 VenomConnect.getPromise("venomwallet", "extension") ||
//                 (() => Promise.reject()),
//               forceUseFallback: true,
//             },
//             packageOptionsStandalone: {
//               fallback: () =>
//                 EverscaleStandaloneClient.create({
//                   // keystore: sks,
//                   // accountsStorage: eas,
//                   connection: {
//                     id: 1010,
//                     group: "venom_devnet",
//                     type: "jrpc",
//                     data: {
//                       endpoint: "https://jrpc-devnet.venom.foundation/rpc",
//                     },
//                   },
//                 }),
//               forceUseFallback: true,
//             },
//             id: "extension",
//             type: "extension",
//           },
//         ],
//       },
//     },
//   });
// };
