// components/PostForm.js
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0051a2;
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
    <Form onSubmit={handleSubmit}>
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind? (Markdown supported)"
      />
      <SubmitButton type="submit">Post</SubmitButton>
    </Form>
  );
}
