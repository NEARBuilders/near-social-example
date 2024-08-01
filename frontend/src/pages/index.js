import { useState, useEffect, useContext } from "react";
import { Social } from "@builddao/near-social-js";
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

const Title = styled.h1`
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
  }, [signedAccountId]);

  const fetchPosts = async () => {
    // First, use index to get the list of posts
    const indexResult = await client.index({
      action: "post",
      key: "main",
      limit: 20,
      order: "desc",
    });

    // Prepare keys for get request
    const keys = indexResult.map((item) => `${item.accountId}/post/main`);

    // Now, use get to fetch the actual post content
    const getResult = await client.get({
      keys: keys,
    });

    // Process the results into a more usable format
    const processedPosts = indexResult.map((item) => ({
      accountId: item.accountId,
      blockHeight: item.blockHeight,
      content: getResult[item.accountId]?.post?.main || "Content not available",
    }));

    setPosts(processedPosts);
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
          },
        },
        account: {
          publicKey: nearAccount.publicKey,
          accountID: nearAccount.accountId,
        },
      });
      const transformedActions = transformActions(transaction.actions);
      console.log(transformedActions);
      await wallet.signAndSendTransaction({
        contractId: SocialContractAccountId,
        actions: transformedActions,
      });
      fetchPosts(); // Refresh the post list
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <MainContainer>
      <Title>NEAR Social Posts</Title>
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
