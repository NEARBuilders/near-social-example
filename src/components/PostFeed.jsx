// components/PostFeed.js
import Post from "./Post";
import { ContentContainer } from './SharedStyles';

export default function PostFeed({ posts }) {
  return (
    <ContentContainer>
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </ContentContainer>
  );
}