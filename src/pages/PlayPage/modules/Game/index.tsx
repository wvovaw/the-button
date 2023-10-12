import { useGame } from "./hooks/useGame";

export default function Game() {
  const { score, attempts, record, isLoading, click } = useGame();
  return (
    <>
      <div>
        <div>Tries: {attempts}</div>
      </div>
      <div>
        <button className="aspect-square w-24 border border-black p-3" onClick={click}>
          {score}
        </button>
        <div>{isLoading ? "Loading..." : JSON.stringify(record)}</div>
      </div>
    </>
  );
}
