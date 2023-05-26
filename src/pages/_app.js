import "@/styles/bootstrap.css";
import '@/styles/custom.css';
import '@/styles/globals.css';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import { useEffect, useState } from 'react';
import { initVenomConnect } from "../components/configure";

export default function App({ Component, pageProps }) {

  const blockURL = "https://testnet.venomscan.com/";

  const [venomConnect, setVenomConnect] = useState();
  const [venomProvider, setVenomProvider] = useState();
  const [signer_address, setSignerAddress] = useState();

  const init = async () => {
    const _venomConnect = await initVenomConnect();
    console.log({ _venomConnect: _venomConnect })
    setVenomConnect(_venomConnect);
  };

  const getAddress = async (provider) => {
    console.log({ provider: provider })
    const providerState = await provider?.getProviderState?.();
    console.log({ providerState: providerState })
    return providerState?.permissions.accountInteraction?.address.toString();
  };

  const checkAuth = async (_venomConnect) => {
    const auth = await _venomConnect?.checkAuth();
    if (auth) await getAddress(_venomConnect);
  };

  const onConnect = async (provider) => {
    setVenomProvider(provider);
    await onProviderReady(provider);
  };

  const onDisconnect = async () => {
    venomProvider?.disconnect();
    setSignerAddress(undefined);
  };

  const onProviderReady = async (provider) => {
    const venomWalletAddress = provider ? await getAddress(provider) : undefined;
    setSignerAddress(venomWalletAddress);
  };

  const connect_wallet = async () => {
    if (!venomConnect) return;
    await venomConnect.connect();
  };

  useEffect(() => {
    init();
  }, []);

  // connect event handler
  useEffect(() => {
    const off = venomConnect?.on('connect', onConnect);
    if (venomConnect) {
      checkAuth(venomConnect);
    }
    return () => {
      off?.();
    };
  }, [venomConnect]);

  return (
    <>
      <Navbar
        theme={"dark"}
        signer_address={signer_address}
        connect_wallet={connect_wallet}
        onDisconnect={onDisconnect}
      />
      <Component {...pageProps}
        theme={"dark"}
        signer_address={signer_address}
        blockURL={blockURL}
      />
      <Footer
        theme={"dark"}
      />
    </>
  )
}
