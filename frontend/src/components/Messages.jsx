import PropTypes from 'prop-types';

export default function Messages({ messages }) {
  return (
    <>
      <h2>Feed</h2>
      {messages.map((message, i) =>
        // TODO: format as cards, add timestamp
        <p key={i}>
          {message.text}
        </p>
      )}
    </>
  );
}

Messages.propTypes = {
  messages: PropTypes.array
};
