import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";
import { Settings } from "lucide-react";
import { SettingsForm } from "./SettingsForm";

export function SettingsPopover() {
  return (
    <Popover >
      <PopoverTrigger className="absolute right-0 bottom-5" asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="w-5 h-5"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" side="top" className="w-56" >
        <SettingsForm />
      </PopoverContent>
    </Popover>
  );
}
