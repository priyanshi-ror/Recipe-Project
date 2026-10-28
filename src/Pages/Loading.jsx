function Loading() {
  return (
    <main
      className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center bg-background text-text px-4"
      role="status"
      aria-live="polite"
    >
      <div className="animate-spin rounded-full h-14 w-14 border-4 border-accent border-t-transparent mb-5" />
      <p className="text-xl font-semibold">Loading recipes...</p>
      <p className="text-sm text-muted mt-2">
        Please wait while we fetch recipe information.
      </p>
    </main>
  );
}

export default Loading;
