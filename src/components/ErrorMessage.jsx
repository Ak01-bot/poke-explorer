export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="text-center py-6">
      <p className="text-red-600 dark:text-red-400 font-medium">{message}</p>
      <button
        onClick={onRetry}
        className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
      >
        Retry
      </button>
    </div>
  );
}
