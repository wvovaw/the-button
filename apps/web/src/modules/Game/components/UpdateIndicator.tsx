import { Loader2 } from 'lucide-react'
import { useGame } from '../contexts/GameContext'

export default function UpdateIndicator() {
  const game = useGame()
  if (!game) throw new Error("Game context isn't available")

  const { isUpdating } = game.state

  return <>{isUpdating && <Loader2 className="text-accent absolute bottom-4 h-10 w-10 animate-spin duration-500" />}</>
}
