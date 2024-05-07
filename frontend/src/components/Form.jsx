import PropTypes from 'prop-types';

export default function Form({ onSubmit, currentAccountId }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset id="fieldset">
        <p>Make your post, { currentAccountId }!</p>
        <p className="highlight">
          <label htmlFor="message">Post</label>
          <input
            autoComplete="off"
            autoFocus
            id="message"
            required
          />
        </p>
        {/* <p>
          <label htmlFor="donation">Donation (optional):</label>
          <input
            autoComplete="off"
            defaultValue={'0'}
            id="donation"
            min="0"
            step="0.01"
            type="number"
          />
          <span title="NEAR Tokens">Ⓝ</span>
        </p> */}
        <button type="submit">
          Post
        </button>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentAccountId: PropTypes.string.isRequired
};