import { utils } from "near-api-js";
import { useState, useEffect, useContext } from "react";
import { Social } from "@builddao/near-social-js";

import Form from "@/components/Form";
import SignIn from "@/components/SignIn";
import Messages from "@/components/Messages";
import styles from "@/styles/app.module.css";

import { NearContext } from "@/context";
import { GuestbookNearContract, NetworkId } from "@/config";

export default function Home() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [name, setName] = useState([]);
  const [nearAccount, setNearAccount] = useState(null);

  useEffect(() => {
    const fetchNearAccount = async () => {
      try {
        const account = await wallet.getNearAccount();
        setNearAccount(account);
      } catch (error) {
        console.error("Error fetching NEAR account:", error);
      }
    };

    if (wallet) {
      fetchNearAccount();
    }
  }, [wallet]);

  const client = new Social({
    contractId: "v1.social08.testnet",
    network: "testnet",
  });

  const setProfile = async (name) => {
    if (!nearAccount) {
      console.error("NEAR account not available");
      return;
    }

    try {
      const transaction = await client.set({
        data: {
          [signedAccountId]: {
            profile: {
              name: name,
            },
          },
        },
        account: {
          publicKey: nearAccount.publicKey,
          accountID: nearAccount.accountId,
        },
      });

      // Transform the actions before passing to signAndSendTransaction
      // Social.set gives us Transaction, where as wallet only accepts Actions and the formats
      // of actions are different, so we wrote this transform function for now to handle this.
      // This need was just identified during this example, this helper function will be included
      // in next release of the NSJS.
      const transformedActions = transformActions(transaction.actions);

      await wallet.signAndSendTransaction({
        contractId: "v1.social08.testnet",
        actions: transformedActions,
      });
    } catch (error) {
      console.error("Error setting profile:", error);
    }
  };

  useEffect(() => {
    getProfileName().then((name) => setName(name));
  }, []);

  const getProfileName = async () => {
    const result = await client.get({
      keys: [signedAccountId + "/profile/name"],
    });
    // Extract the name from the result object
    return result[signedAccountId]?.profile?.name || "";
  };

  // ... (in the component body)
  useEffect(() => {
    if (signedAccountId) {
      getProfileName().then((fetchedName) => setName(fetchedName));
    }
  }, [signedAccountId]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const { fieldset, name } = e.target.elements;
    fieldset.disabled = true;
    console.log("name from form", name.value);
    await setProfile(name.value);
    // Get updated profile Name
    const nameOnChain = await getProfileName();
    setName(nameOnChain);
    name.value = "";
    fieldset.disabled = false;
    name.focus();
  };

  return (
    <main className={styles.main}>
      <div className="container">
        <h1>📖 NEAR Social Example</h1>
        {signedAccountId ? (
          <Form onSubmit={onSubmit} currentAccountId={signedAccountId} />
        ) : (
          <SignIn />
        )}
      </div>
      {name && <div>Curren Name: {name}</div>}
    </main>
  );
}

//Helper function to transform Actions retruend by Social JS transaction to be use by wallet.
const transformActions = (actions) => {
  return actions.map((action) => ({
    type: "FunctionCall",
    params: {
      methodName: action.functionCall.methodName,
      args: action.functionCall.args,
      gas: action.functionCall.gas,
      deposit: action.functionCall.deposit,
    },
  }));
};
