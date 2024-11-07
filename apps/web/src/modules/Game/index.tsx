import ErrorIndicator from './components/ErrorIndicator'
import { SettingsPopover } from './components/SettingsPopover'
import Stats from './components/Stats'
import TheButton from './components/TheButton'
import UpdateIndicator from './components/UpdateIndicator'
import { GameProvider } from './contexts/GameContext'
import { SettingsProvider } from './contexts/SettingsContext'

export default function Game() {
  return (
    <div className="relative h-[calc(100vh-85px)] w-full">
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
  )
}
