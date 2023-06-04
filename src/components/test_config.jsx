import { VenomConnect } from "venom-connect";
import { ProviderRpcClient } from "everscale-inpage-provider";
import EverscaleStandaloneClient from "everscale-standalone-client";
  
const standaloneFallback = (checkNetworkId = 1002) =>
  EverscaleStandaloneClient.create({
    connection: getNetworkData(checkNetworkId, "connection"),
  });

export const initVenomConnect = async (checkNetworkId = 1002) => {
  return new VenomConnect({
    theme: "dark",
    checkNetworkId: checkNetworkId,
    providersOptions: {
      venomwallet: {
        walletWaysToConnect: [
          {
            // NPM package
            package: ProviderRpcClient,
            packageOptions: {
              fallback:
                VenomConnect.getPromise("venomwallet", "extension") ||
                (() => Promise.reject()),
              forceUseFallback: true,
            },
            packageOptionsStandalone: {
              fallback: standaloneFallback,
              forceUseFallback: true,
            },

            // Setup
            id: "extension",
            type: "extension",
          },
        ],
        defaultWalletWaysToConnect: [
          // List of enabled options
          "mobile",
          "ios",
          "android",
        ],
      },
      // everwallet: {
      //   links: {
      //     qr: null,
      //   },
      //   walletWaysToConnect: [
      //     {
      //       // NPM package
      //       package: ProviderRpcClient,
      //       packageOptions: {
      //         fallback: VenomConnect.getPromise('everwallet', 'extension') || (() => Promise.reject()),
      //         forceUseFallback: true,
      //       },
      //       packageOptionsStandalone: {
      //         fallback: standaloneFallback,
      //         forceUseFallback: true,
      //       },
      //       id: 'extension',
      //       type: 'extension',
      //     },
      //   ],
      //   defaultWalletWaysToConnect: [
      //     // List of enabled options
      //     'mobile',
      //     'ios',
      //     'android',
      //   ],
      // },
      // oxychatwallet: {
      //   walletWaysToConnect: [
      //     {
      //       // NPM package
      //       package: ProviderRpcClient,
      //       packageOptions: {
      //         fallback: VenomConnect.getPromise('oxychatwallet', 'extension') || (() => Promise.reject()),
      //         forceUseFallback: true,
      //       },
      //       packageOptionsStandalone: {
      //         fallback: standaloneFallback,
      //         forceUseFallback: true,
      //       },
      //
      //       // Setup
      //       id: 'extension',
      //       type: 'extension',
      //     },
      //   ],
      //   defaultWalletWaysToConnect: [
      //     // List of enabled options
      //     'mobile',
      //     'ios',
      //     'android',
      //   ],
      // },
    },
  });
};
