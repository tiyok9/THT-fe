const ButtonAnimation = ({
  loading,
  text,
}: {
  loading: boolean;
  text: string;
}) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-blue-500 hover:cursor-pointer text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
    >
      {loading ? (
        <div className="flex flex-row gap-1 items-center">
          <svg
            className="animate-spin w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M4 12a8 8 0 0 1 16 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
          </svg>
          Proses
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default ButtonAnimation;
