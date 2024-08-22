import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Social } from "@builddao/near-social-js";
import { transformActions } from "@builddao/near-social-js";
import { NetworkId, SocialContractAccountId } from "@/config";
import { NearContext } from "@/context";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const Content = styled.div`
  width: 100%;
  max-width: 64rem;
  background-color: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  overflow: hidden;
  margin: 2rem 0;
`;

const Inner = styled.div`
  padding: 1.5rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CodeBlock = styled.pre`
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.25rem;
  overflow-x: auto;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  background-color: black;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const ResultBlock = styled.div`
  margin-top: 0.5rem;
`;

const ResultTitle = styled.h3`
  font-weight: 600;
`;

const ResultContent = styled.pre`
  background-color: #f3f4f6;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-top: 0.25rem;
  font-size: 0.875rem;
`;

const NearSocialJSExample = () => {
  const [client, setClient] = useState(null);
  const { signedAccountId, wallet } = useContext(NearContext);
  const [nearAccount, setNearAccount] = useState(null);
  const [indexResult, setIndexResult] = useState(null);
  const [getResult, setGetResult] = useState(null);
  const [keysResult, setKeysResult] = useState(null);
  const [setResult, setSetResult] = useState(null);

  useEffect(() => {
    // Initialize the client
    const newClient = new Social({
      contractId: SocialContractAccountId,
      network: NetworkId,
    });
    setClient(newClient);
  }, []);

  useEffect(() => {
    const fetchNearAccount = async () => {
      if (wallet) {
        try {
          const account = await wallet.getNearAccount();
          setNearAccount(account);
        } catch (error) {
          console.error("Error fetching NEAR account:", error);
        }
      }
    };
    fetchNearAccount();
  }, [wallet]);

  const handleIndex = async () => {
    if (client) {
      try {
        const result = await client.index({
          action: "post",
          key: "main",
          limit: 5,
          order: "desc",
        });
        setIndexResult(result);
      } catch (error) {
        console.error("Error fetching index:", error);
        setIndexResult({ error: error.message });
      }
    }
  };

  const handleGet = async () => {
    if (client) {
      try {
        const result = await client.get({
          keys: ["jass.near/post/main"],
          blockHeight: "124770102"
        });
        setGetResult(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setGetResult({ error: error.message });
      }
    }
  };

  const handleKeys = async () => {
    if (client) {
      try {
        const result = await client.keys({
          keys: ["jass.near/post/main"],
          blockHeight: "124770102"
        });
        setKeysResult(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setKeysResult({ error: error.message });
      }
    }
  };

  const handleSet = async () => {
    if (client && nearAccount && signedAccountId) {
      try {
        const transaction = await client.set({
          data: {
            [signedAccountId]: {
              post: {
                main: JSON.stringify({ type: "md", text: "Hello, Near Social!" }),
              },
              index: {
                post: JSON.stringify({
                  key: "main",
                  value: {
                    type: "md",
                  },
                }),
              },
            },
          },
          account: {
            publicKey: nearAccount.publicKey,
            accountID: nearAccount.accountId,
          },
        });

        const transformedActions = transformActions(transaction.actions);
        const result = await wallet.signAndSendTransaction({
          contractId: SocialContractAccountId,
          actions: transformedActions,
        });
        setSetResult(result);
      } catch (error) {
        console.error("Error setting data:", error);
        setSetResult({ error: error.message });
      }
    } else {
      setSetResult({ error: "Wallet not connected or account not available" });
    }
  };

  return (
    <>
    <Container>
      <Content>
        <Inner>
          <Section>
            <Title>Client Setup</Title>
            <CodeBlock>
              <code>{`
import { Social } from "@builddao/near-social-js";

const client = new Social({
  contractId: "social.near",
  network: "mainnet",
});`}
              </code>
            </CodeBlock>
          </Section>

          <Section>
            <Title>Social.index() Function</Title>
            <CodeBlock>
              <code>{`
const result = await client.index({
  action: "post",
  key: "main",
  limit: 5,
  order: "desc"
});`}
              </code>
            </CodeBlock>
            <Button onClick={handleIndex}>
              Run Index
            </Button>
            {indexResult && (
              <ResultBlock>
                <ResultTitle>Result:</ResultTitle>
                <ResultContent>
                  {JSON.stringify(indexResult, null, 2)}
                </ResultContent>
              </ResultBlock>
            )}
          </Section>

          <Section>
            <Title>Social.get() Function</Title>
            <CodeBlock>
              <code>{`
const result = await client.get({
  keys: ["jass.near/post/main"],
  blockHeight: "124770102"
});`}
              </code>
            </CodeBlock>
            <Button onClick={handleGet}>
              Run Get
            </Button>
            {getResult && (
              <ResultBlock>
                <ResultTitle>Result:</ResultTitle>
                <ResultContent>
                  {JSON.stringify(getResult, null, 2)}
                </ResultContent>
              </ResultBlock>
            )}
          </Section>

          <Section>
            <Title>Social.keys() Function</Title>
            <CodeBlock>
              <code>{`
const result = await client.keys({
  keys: ["jass.near/post/main"],
  blockHeight: "124770102"
});`}
              </code>
            </CodeBlock>
            <Button onClick={handleKeys}>
              Run Keys
            </Button>
            {keysResult && (
              <ResultBlock>
                <ResultTitle>Result:</ResultTitle>
                <ResultContent>
                  {JSON.stringify(keysResult, null, 2)}
                </ResultContent>
              </ResultBlock>
            )}
          </Section>

          <Section>
            <Title>Social.isWritePermissionGranted() Function</Title>
            <CodeBlock>
              <code>{}
              </code>
            </CodeBlock>
            <Button>
              Run 
            </Button>
          </Section>
          </Inner>
          </Content>
  </Container>
  <Container>
  <Content>
      <Inner>
          
          <Section>
            <Title>Social.grantWritePermission() Function</Title>
            <CodeBlock>
              <code>{}
              </code>
            </CodeBlock>
            <Button>
              Run 
            </Button>
          </Section>

          <Section>
            <Title>Set Function (Post)</Title>
            <CodeBlock>
              <code>{`
const result = await client.set({
  data: {
    "example.near": {
      post: {
        main: JSON.stringify({ text: "Hello, Near Social!" }),
      },
      index: {
        post: JSON.stringify({
          key: "main",
          value: {
            type: "md",
          },
        }),
      },
    },
  },
});`}
              </code>
            </CodeBlock>
            {signedAccountId ? (
              <Button onClick={handleSet}>
                Run Set
              </Button>
            ) : (
              <p>Please connect your wallet to run this function.</p>
            )}
            {setResult && (
              <ResultBlock>
                <ResultTitle>Result:</ResultTitle>
                <ResultContent>
                  {JSON.stringify(setResult, null, 2)}
                </ResultContent>
              </ResultBlock>
            )}
          </Section>

          <Section>
            <Title>Social.storageDeposit() Function</Title>
            <CodeBlock>
              <code>{}
              </code>
            </CodeBlock>
            <Button>
              Run 
            </Button>
          </Section>

          <Section>
            <Title>Social.storageWithdraw() Function</Title>
            <CodeBlock>
              <code>{}
              </code>
            </CodeBlock>
            <Button>
              Run 
            </Button>
          </Section>
        </Inner>
      </Content>
    </Container>
    </>
  );
};

export default NearSocialJSExample;