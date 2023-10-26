import { GameProvider } from "./contexts";
import Stats from "./components/Stats";
import TheButton from "./components/TheButton";
import UpdateIndicator from "./components/UpdateIndicator";
import ErrorIndicator from "./components/ErrorIndicator";

export default function Game() {
  return (
    <div className="h-[calc(100vh-80px)] w-full relative">
      <GameProvider>
        <Stats />
        <TheButton />
        <UpdateIndicator />
        <ErrorIndicator />
      </GameProvider>
    </div>
  );
}
