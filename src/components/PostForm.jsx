// components/PostForm.js
import { useState } from "react";
import styled from "styled-components";
import { ContentContainer } from './SharedStyles';

const FormContainer = styled.div`
  background-color: ${props => props.theme.colors.secondary.white};
  border-radius: 8px;
  padding: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.medium};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: ${props => props.theme.spacing.medium};
  border-radius: 4px;
  border: 1px solid ${props => props.theme.colors.secondary.lightGray};
  resize: vertical;
  font-family: ${props => props.theme.typography.primaryFont};
  font-size: ${props => props.theme.typography.sizes.body};
  color: ${props => props.theme.colors.secondary.darkGray};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.softBlue};
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.buttons.primary.background};
  color: ${props => props.theme.buttons.primary.color};
  border: none;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: 4px;
  cursor: pointer;
  margin-top: ${props => props.theme.spacing.medium};
  font-family: ${props => props.theme.typography.primaryFont};
  font-size: ${props => props.theme.typography.sizes.body};
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.theme.buttons.primary.hoverBackground};
  }

  &:active {
    background: ${props => props.theme.buttons.primary.activeBackground};
  }
`;

export default function PostForm({ onSubmit }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const postContent = JSON.stringify({
      type: "md",
      text: content,
    });
    onSubmit(postContent);
    setContent("");
  };

  return (
    <ContentContainer>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
          />
          <SubmitButton type="submit">Post</SubmitButton>
        </Form>
      </FormContainer>
    </ContentContainer>
  );
}