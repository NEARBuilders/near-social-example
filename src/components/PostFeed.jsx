// components/PostFeed.js
import Post from "./Post";
import styled from "styled-components";

const FeedContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

export default function PostFeed({ posts }) {
  return (
    <FeedContainer>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </FeedContainer>
  );
}
