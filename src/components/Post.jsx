// components/Post.js
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const PostContainer = styled.div`
  background-color: ${props => props.theme.colors.secondary.white};
  border-radius: 8px;
  padding: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.medium};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Author = styled.p`
  font-weight: bold;
  color: ${props => props.theme.colors.secondary.darkGray};
  font-family: ${props => props.theme.typography.primaryFont};
  font-size: ${props => props.theme.typography.sizes.body};
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
`;

const Content = styled.div`
  margin-top: ${props => props.theme.spacing.small};
  font-family: ${props => props.theme.typography.primaryFont};
  font-size: ${props => props.theme.typography.sizes.body};
  color: ${props => props.theme.colors.secondary.darkGray};
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
  font-size: ${props => props.theme.typography.sizes.small};
  color: ${props => props.theme.colors.secondary.darkGray};
  margin-top: ${props => props.theme.spacing.small};
  font-family: ${props => props.theme.typography.primaryFont};
`;

export default function Post({ post }) {
  return (
    <PostContainer>
      <Author>{post.accountId}</Author>
      <Content>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </Content>
      {/* <BlockHeight>Posted at block: {post.blockHeight}</BlockHeight> */}
    </PostContainer>
  );
}