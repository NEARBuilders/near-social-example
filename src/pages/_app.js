import { useEffect, useState } from "react";

import "@/styles/globals.css";
import { NearContext } from "@/context";
import { Navigation } from "@/components/Navigation";

import { Wallet } from "@/wallets/near";
import { NetworkId, SocialContractAccountId } from "@/config";

const wallet = new Wallet({
  createAccessKeyFor: SocialContractAccountId,
  networkId: NetworkId, //by default testnet, choose mainnet for working feed
});

export default function MyApp({ Component, pageProps }) {
  const [signedAccountId, setSignedAccountId] = useState("");

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      <Navigation />
      <Component {...pageProps} />
    </NearContext.Provider>
  );
}
