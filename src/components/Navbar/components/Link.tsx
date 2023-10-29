import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/NavigationMenu";
import { Button } from "@/components/ui/Button";
import { Link, useMatch } from "react-router-dom";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavbarLinkProps {
  children: ReactNode;
  className?: string;
  to: string;
}
export function NavbarLink({ children, className, to, ...rest }: NavbarLinkProps) {
  const match = useMatch(to);
  return (
    <NavigationMenuLink
      className={cn(
        navigationMenuTriggerStyle(),
        "text-muted-foreground/70 hover:bg-transparent hover:text-muted focus:bg-transparent focus:text-muted-foreground data-[active]:bg-transparent data-[active]:text-muted-foreground data-[active]:hover:text-muted",
        className,
      )}
      active={!!match}
      asChild
      {...rest}
    >
      <Link to={to}>{children}</Link>
    </NavigationMenuLink>
  );
}

export function NavbarButtonLink({ children, className, to, ...rest }: NavbarLinkProps) {
  return (
    <Button variant="outline" className={cn("text-accent border-accent font-bold", className)} asChild>
      <NavigationMenuLink
        className={cn(navigationMenuTriggerStyle(), "font-semibold hover:no-underline", className)}
        asChild
        {...rest}
      >
        <Link to={to}>{children}</Link>
      </NavigationMenuLink>
    </Button>
  );
}
