export default function Form({ onSubmit, currentAccountId }) {
  return (
    <form onSubmit={onSubmit} className="p-4 border rounded shadow-sm">
      <fieldset id="fieldset">
        <h2 className="mb-4">Profile Example</h2>
        <p>Check your Near Social Profile, {currentAccountId}!</p>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Profile Name
          </label>
          <input
            autoComplete="off"
            autoFocus
            id="name"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Store Name on-chain
        </button>
      </fieldset>
    </form>
  );
}
