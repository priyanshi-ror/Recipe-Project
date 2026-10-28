function Loading() {
  return (
    <section className="loading-state" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <p>Gathering something delicious…</p>
    </section>
  );
}

export default Loading;
