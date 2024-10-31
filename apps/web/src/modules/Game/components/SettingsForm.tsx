import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import { useSettings } from '../contexts/SettingsContext'
import { toggleSoundAction } from '../contexts/SettingsContext/actions/toggleSoundAction'

export function SettingsForm() {
  const settings = useSettings()
  if (!settings) throw new Error("Settings context isn't available")

  const { state, dispatch } = settings

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-heading font-medium leading-none">Settings</h4>
        <p className="text-sm text-muted-foreground">Game settings</p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-2 items-center gap-4">
          <Label htmlFor="sound">Sound</Label>
          <Switch
            id="sound"
            className="place-self-center"
            checked={state.sounds}
            onCheckedChange={() => toggleSoundAction(dispatch)}
          />
        </div>
      </div>
    </div>
  )
}
