import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/NavigationMenu";
import { Link, useMatch } from "react-router-dom";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface NavbarLinkProps {
  children: ReactNode;
  className?: string;
  to: string;
}
export function NavbarLink({ children, className, to, ...rest }: NavbarLinkProps) {
  const match = useMatch(to);
  return (
    <Button variant="link" className={cn("text-base font-semibold hover:no-underline", className)} asChild>
      <NavigationMenuLink
        {...rest}
        className={cn(
          navigationMenuTriggerStyle(),
          "text-primary/70 hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary data-[active]:bg-transparent data-[active]:text-primary",
          className,
        )}
        active={!!match}
        asChild
      >
        <Link to={to}>{children}</Link>
      </NavigationMenuLink>
    </Button>
  );
}
