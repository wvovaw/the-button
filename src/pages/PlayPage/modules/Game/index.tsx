import { useGame } from "./hooks/useGame";

export default function Game() {
  const { score, attempts, record, isLoading, click } = useGame();
  return (
    <>
      <div>
        <div>Tries: {attempts}</div>
      </div>
      <div>
        <button
          className="aspect-square w-24 border border-black p-3 disabled:border-gray-400 disabled:text-gray-400"
          onClick={click}
          disabled={isLoading}
        >
          {score}
        </button>
        <div>{isLoading ? "Loading..." : JSON.stringify(record)}</div>
      </div>
    </>
  );
}
