import { SettingsProvider } from "./contexts/SettingsContext";
import { GameProvider } from "./contexts/GameContext";
import Stats from "./components/Stats";
import TheButton from "./components/TheButton";
import UpdateIndicator from "./components/UpdateIndicator";
import ErrorIndicator from "./components/ErrorIndicator";
import { SettingsPopover } from "./components/SettingsPopover";

export default function Game() {
  return (
    <div className="h-[calc(100vh-85px)] w-full relative">
      <SettingsProvider>
        <SettingsPopover />
        <GameProvider>
          <Stats />
          <TheButton />
          <UpdateIndicator />
          <ErrorIndicator />
        </GameProvider>
      </SettingsProvider>
    </div>
  );
}
