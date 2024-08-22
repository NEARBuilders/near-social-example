import { useState, useEffect, useContext } from "react";
import { Social } from "@builddao/near-social-js";
import { transformActions } from "@builddao/near-social-js";
import PostForm from "@/components/PostForm";
import PostFeed from "@/components/PostFeed";
import SignIn from "@/components/SignIn";
import { NearContext } from "@/context";
import styled from "styled-components";
import { NetworkId, SocialContractAccountId } from "@/config";

const MainContainer = styled.main`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const FeedContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export default function Home() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [posts, setPosts] = useState([]);
  const [nearAccount, setNearAccount] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const client = new Social({
    contractId: SocialContractAccountId,
    network: NetworkId,
  });

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

  useEffect(() => {
    fetchPosts();
  }, [signedAccountId, refreshTrigger]);

  const fetchPosts = async () => {
    try {
      // First, use index to get the list of posts
      const indexResult = await client.index({
        action: "post",
        key: "main",
        limit: 20,
        order: "desc",
      });

      // Fetch each post individually with its specific block height
      const processedPosts = await Promise.all(
        indexResult.map(async (item) => {
          const getResult = await client.get({
            keys: [`${item.accountId}/post/main`],
            blockHeight: item.blockHeight,
          });

          const postContent = getResult[item.accountId]?.post?.main;
          let parsedContent;
          try {
            parsedContent = JSON.parse(postContent);
          } catch (e) {
            console.error("Error parsing post content:", e);
            parsedContent = { text: "Error: Could not parse post content" };
          }

          return {
            accountId: item.accountId,
            blockHeight: item.blockHeight,
            content: parsedContent.text || "No content available",
          };
        }),
      );

      setPosts(processedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const createPost = async (content) => {
    if (!nearAccount) {
      console.error("NEAR account not available");
      return;
    }
    try {
      const transaction = await client.set({
        data: {
          [signedAccountId]: {
            post: {
              main: content,
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

      //const transformedActions = transformActions(transaction.actions);
      const transformedActions = transformActions(transaction.actions);
      console.log(transformedActions);
      await wallet.signAndSendTransaction({
        contractId: SocialContractAccountId,
        actions: transformedActions,
      });
      setRefreshTrigger((prev) => prev + 1); // Trigger a refresh after posting
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <MainContainer>
      {signedAccountId ? (
        <>
          <PostForm onSubmit={createPost} />
          <PostFeed posts={posts} />
        </>
      ) : (
        <FeedContainer>
          <SignIn />
          <PostFeed posts={posts} />
        </FeedContainer>
      )}
    </MainContainer>
  );
}

// Helper function to transform Actions
// const transformActions = (actions) => {
//   return actions.map((action) => ({
//     type: "FunctionCall",
//     params: {
//       methodName: action.functionCall.methodName,
//       args: action.functionCall.args,
//       gas: action.functionCall.gas,
//       deposit: action.functionCall.deposit,
//     },
//   }));
// };
