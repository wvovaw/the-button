import { useCallback } from 'react'
import useSound from 'use-sound'
import clickInSound from '@/assets/sounds/click-in.mp3'
import clickOutSound from '@/assets/sounds/click-out.mp3'
import { clickAction, useGame } from '../contexts/GameContext'
import { useSettings } from '../contexts/SettingsContext'

export default function TheButton() {
  const game = useGame()
  if (!game) throw new Error("Game context isn't available")

  const settings = useSettings()
  if (!settings) throw new Error("Settings context isn't available")

  const { dispatch } = game
  const { isUpdating } = game.state
  const { counter } = game.state.stats
  const isSoundOn = settings.state.sounds

  const [playClickIn] = useSound(clickInSound, { volume: 0.5 })
  const [playClickOut] = useSound(clickOutSound, { volume: 0.3 })

  const handleClick = useCallback(() => {
    clickAction(dispatch, game.state)
  }, [dispatch, game.state])

  const handleMouseDown = useCallback(() => {
    if (isSoundOn) playClickIn()
  }, [isSoundOn, playClickIn])

  const handleMouseUp = useCallback(() => {
    if (isSoundOn) playClickOut()
  }, [isSoundOn, playClickOut])

  return (
    <div className="grid h-full w-full place-content-center">
      <button
        type="button"
        className="the-button-3d"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        disabled={isUpdating}
      >
        {counter}
      </button>
    </div>
  )
}
