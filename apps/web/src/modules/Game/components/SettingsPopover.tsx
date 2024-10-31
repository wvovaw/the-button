import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import { Button } from '@/components/ui/Button'
import { Settings } from 'lucide-react'
import { SettingsForm } from './SettingsForm'

export function SettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger className="absolute bottom-5 right-0" asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" side="top" className="w-56">
        <SettingsForm />
      </PopoverContent>
    </Popover>
  )
}
