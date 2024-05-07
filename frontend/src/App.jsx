import { useEffect, useState } from 'react'
import { Wallet } from "./services/near-wallet";
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';
import { utils } from 'near-api-js';

//v1.social08.testnet
//const CONTRACT_NAME = "guestbook.near-examples.testnet"
const CONTRACT_NAME = "social.near"
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_NAME })

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initFunction = async () => {
      const isSignedIn = await wallet.startUp();
      const messages = await getLast10Messages();
      //console.log("Effect",messages);
      
      setIsSignedIn(isSignedIn);
      setMessages(messages);
    }
    initFunction();
  }, []);

  // const getLast10Messages = async () => {
  //   //const total_messages = await wallet.viewMethod({ contractId: CONTRACT_NAME, method: "total_messages" });
  //   //const from_index = total_messages >= 10 ? total_messages - 10 : 0;
  //   //return wallet.viewMethod({ contractId: CONTRACT_NAME, method: "get_messages", args: { from_index: String(from_index), limit: "10" } });
  //   const test = await wallet.viewMethod({ contractId: CONTRACT_NAME, method: "get", args:{keys: ["jass.near/post/main/"]} });
  //   console.log(test);
  //   return test;

  //   //get({keys: ["alex.near/profile/name"]})
  // }
  // Change this for 10 recent posts
  const getLast10Messages = async () => {
    const response = await wallet.viewMethod({
      contractId: CONTRACT_NAME,
      method: "get",
      args: { keys: ["jass.near/post/main/"] }
    });
    //console.log(response); // This will log the full response object.
  
    // Parse the JSON string from the specific key
    const message = JSON.parse(response['jass.near'].post.main);
    //console.log(message); // This will log the parsed message object.
    
    return [message]; // Wrapping in an array since your component expects an array of messages
  }


  //Set call
  // {
  //   "data": {
  //     "jass.near": {
  //       "post": {
  //         "main": "{\"type\":\"md\",\"text\":\"This is a test post. \"}"
  //       },
  //       "index": {
  //         "post": "{\"key\":\"main\",\"value\":{\"type\":\"md\"}}"
  //       }
  //     }
  //   }
  // }
  // //change this for Posts
  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   const { fieldset, message, donation } = e.target.elements;

  //   fieldset.disabled = true;

  //   // Add message to the guest book
  //   // const deposit = utils.format.parseNearAmount(donation.value);
  //   await wallet.callMethod({ contractId: CONTRACT_NAME, method: "set", args: { text: message.value }, deposit });

  //   // Get updated messages
  //   const messages = await getLast10Messages();
  //   setMessages(messages.reverse());

  //   message.value = '';
  //   donation.value = '0';
  //   fieldset.disabled = false;
  //   message.focus();
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
  
    console.log("I am here.")
    const { fieldset, message, donation } = e.target.elements;
    fieldset.disabled = true;
    console.log("I am here 2")
  
    const messageData = JSON.stringify({
      type: "md",
      text: message.value
    });

    console.log(messageData);
  
    // Create the data object in the required format
    const data = {
      data: {
        [wallet.accountId]: {
          post: {
            main: messageData
          },
          index: {
            post: JSON.stringify({ key: "main", value: { type: "md" } })
          }
        }
      }
    };

    console.log(data);
  
    // Call the set method on the blockchain
    await wallet.callMethod({
      contractId: CONTRACT_NAME,
      method: "set",
      args: data,
      //deposit:"0.01"
    });
  
    // Get updated messages
    const messages = await getLast10Messages();
    setMessages(messages.reverse());
  
    message.value = '';
    donation.value = '0';
    fieldset.disabled = false;
    message.focus();
  };
  

  const signIn = () => { wallet.signIn() }

  const signOut = () => { wallet.signOut() }

  return (
    <main>
      <table>
        <tr>
          <td><h1>📖 NEAR Social simple feed</h1></td>
          <td>{isSignedIn
            ? <button onClick={signOut}>Log out</button>
            : <button onClick={signIn}>Log in</button>
          }</td>
        </tr>
      </table>

      <hr />
      {isSignedIn
        ? <Form onSubmit={onSubmit} currentAccountId={wallet.accountId} />
        : <SignIn />
      }

      <hr />

      {!!messages.length && <Messages messages={messages} />}

    </main>
  )
}

export default App
