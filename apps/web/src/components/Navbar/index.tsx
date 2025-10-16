import type { MouseEvent } from 'react'
import { ChevronDown, Lightbulb, LogOut, SettingsIcon, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import { NavbarButtonLink, NavbarLink } from './components/Link'

export default function Navbar() {
  return (
    <NavigationMenu className="max-w-full justify-between px-5 py-3">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavbarLink to="/">Home</NavbarLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavbarLink to="/leaderboard">Leaderboard</NavbarLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavbarLink to="/play">Play</NavbarLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <UsernameOrLogin />
    </NavigationMenu>
  )
}

function UsernameOrLogin({ className }: { className?: string }) {
  const authCtx = useAuth()
  const { theme, set: setTheme } = useTheme()

  function themeSwitchHandler(e: MouseEvent<HTMLElement>) {
    e.stopPropagation()
    e.preventDefault()

    if (theme === 'light') setTheme('dark')
    else setTheme('light')
  }

  const navigate = useNavigate()

  if (authCtx.isAuthenticated())
    return (
      <NavigationMenuList className={className}>
        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="group my-2 flex items-center">
              <span className="select-none text-base font-semibold text-foreground/80">{authCtx.user?.name}</span>
              <ChevronDown
                className="relative top-[1px] ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" alignOffset={5} sideOffset={10}>
              <DropdownMenuItem disabled className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled className="cursor-pointer">
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={(e) => themeSwitchHandler(e)}>
                <Lightbulb className="mr-2 h-4 w-4" />
                <span className="mr-2">Light Theme</span>
                <Switch checked={theme === 'light'} />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => authCtx.signOut(() => navigate('/', { replace: true }))}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
      </NavigationMenuList>
    )
  else
    return (
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavbarLink to="/signin">Sign in</NavbarLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavbarButtonLink to="/signup">Sign up</NavbarButtonLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    )
}

