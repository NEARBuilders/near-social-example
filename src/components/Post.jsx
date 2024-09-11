// components/Post.js
import { Social } from "@builddao/near-social-js";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { NetworkId, SocialContractAccountId } from "@/config";

import PostFeed from "./PostFeed";

const PostContainer = styled.div`
  background-color: ${(props) => props.theme.colors.secondary.white};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.medium};
  margin-bottom: ${(props) => props.theme.spacing.medium};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Author = styled.p`
  font-weight: bold;
  color: ${(props) => props.theme.colors.secondary.darkGray};
  font-family: ${(props) => props.theme.typography.primaryFont};
  font-size: ${(props) => props.theme.typography.sizes.body};
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
`;

const Content = styled.div`
  margin-top: ${(props) => props.theme.spacing.small};
  font-family: ${(props) => props.theme.typography.primaryFont};
  font-size: ${(props) => props.theme.typography.sizes.body};
  color: ${(props) => props.theme.colors.secondary.darkGray};
  word-wrap: break-word;
  overflow-wrap: break-word;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }

  pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const BlockHeight = styled.p`
  font-size: ${(props) => props.theme.typography.sizes.small};
  color: ${(props) => props.theme.colors.secondary.darkGray};
  margin-top: ${(props) => props.theme.spacing.small};
  font-family: ${(props) => props.theme.typography.primaryFont};
`;

const client = new Social({
  contractId: SocialContractAccountId,
  network: NetworkId,
});

export default function Post({ post }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      // First, use index to get the list of posts
      const indexResult = await client.index({
        action: "comment",
        key: post.item,
        limit: 20,
        order: "desc",
      });

      // Fetch each comment individually with its specific block height
      const processedComments = await Promise.all(
        indexResult.map(async (item) => {
          const getResult = await client.get({
            keys: [`${item.accountId}/post/comment`],
            blockHeight: item.blockHeight,
          });

          const commentContent = getResult[item.accountId]?.post?.comment;
          let parsedContent;
          try {
            parsedContent = JSON.parse(commentContent);
          } catch (e) {
            console.error("Error parsing comment content:", e);
            parsedContent = { text: "Error: Could not parse comment content" };
          }

          return {
            accountId: item.accountId,
            blockHeight: item.blockHeight,
            content: parsedContent.text || "No content available",
          };
        })
      );

      setComments(processedComments);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (post?.item) {
      fetchComments();
    }
  }, [post]);

  return (
    <PostContainer>
      <Content>
        <ReactMarkdown>{post.content}</ReactMarkdown>
        <PostFeed posts={comments} />
      </Content>
    </PostContainer>
  );
}
