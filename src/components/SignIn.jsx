import styled from "styled-components";

const PostContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: bold;
`;

export default function SignIn() {
  return <PostContainer>Sign in and Post!</PostContainer>;
}
