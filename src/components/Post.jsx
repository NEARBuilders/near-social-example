// components/Post.js
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const PostContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Author = styled.p`
  font-weight: bold;
  color: #333;
`;

const Content = styled.div`
  margin-top: 8px;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
`;

const BlockHeight = styled.p`
  font-size: 0.8em;
  color: #666;
  margin-top: 8px;
`;

export default function Post({ post }) {
  //const parsedContent = JSON.parse(post.content);

  return (
    <PostContainer>
      <Author>{post.accountId}</Author>
      <Content>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Content>
      <BlockHeight>Posted at block: {post.blockHeight}</BlockHeight>
    </PostContainer>
  );
}
