// "use client";
import { VenomConnect } from "venom-connect";
import { ProviderRpcClient } from "everscale-inpage-provider";
import {
  EverscaleStandaloneClient,
  SimpleKeystore,
} from "everscale-standalone-client";

const ballotActivationSignerKeys = {
  // suppose we have this variables in system environment...you can use dotenv for example
  public: "a6ffc482a89817d62314bf333f30dc45cd6045b87f8ee4e3c231bd6e55a38001",
  secret:
    "naive talent fork license vacuum rocket slot auction ability birth police wheat",
};

export const initVenomConnect = async () => {
  return new VenomConnect({
    theme: "dark",
    checkNetworkId: 1000,
    checkNetworkName: "Venom Devnet",
    providersOptions: {
      venomwallet: {
        walletWaysToConnect: [
          {
            package: ProviderRpcClient,
            packageOptions: {
              fallback:
                VenomConnect.getPromise("venomwallet", "extension") ||
                (() => Promise.reject()),
              forceUseFallback: true,
            },
            packageOptionsStandalone: {
              fallback: () =>
                EverscaleStandaloneClient.create({
                  // accountsStorage: {},
                  // keystore: new SimpleKeystore({
                  //   [ballotActivationSignerKeys.public]: {
                  //     publicKey:
                  //       "a6ffc482a89817d62314bf333f30dc45cd6045b87f8ee4e3c231bd6e55a38001",
                  //     secretKey:
                  //       "naive talent fork license vacuum rocket slot auction ability birth police wheat",
                  //   },
                  // }),
                  connection: {
                    id: 1010,
                    group: "venom_testnet",
                    type: "jrpc",
                    data: {
                      endpoint: "https://jrpc-devnet.venom.foundation/rpc",
                    },
                  },
                }),
              forceUseFallback: true,
            },
            id: "extension",
            type: "extension",
          },
        ],
      },
    },
  });
};
