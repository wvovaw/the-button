import { Button } from "@/components/ui/Button";
import { Stats } from "./Stats";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
export function Hero() {
  const authCtx = useAuth();
  if (!authCtx) throw new Error("AuthProvider is not available");

  return (
    <section className="mx-auto flex flex-col justify-center pt-4 sm:px-6 sm:py-12 lg:flex-row lg:justify-between lg:py-24  font-body">
      <div className="flex flex-col justify-center rounded-sm text-center sm:p-6 lg:max-w-md lg:text-left xl:max-w-lg">
        <h1 className="font-heading text-5xl font-bold sm:text-6xl">
          The <span className="text-primary">Button</span>
        </h1>
        <p className="mb-8 mt-6 text-lg sm:mb-12">
          A clicker game where with each your click the chance of resetting the meter increases by 1 %. Let&apos;s see,
          how many clicks and time it will take to reach at least 50 points?
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-start">
          <Button variant="link" className="px-8 py-3 text-lg font-semibold text-accent">
            I&apos;m just a link
          </Button>
          {authCtx.isAuthenticated() ? (
            <Button variant="default" className="px-8 py-3 text-lg font-semibold" asChild>
              <Link to="/play">
                Play!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          ) : (
            <Button variant="default" className="px-8 py-3 text-lg font-semibold" asChild>
              <Link to="/signup">
                Sign Up & Go
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div className="xl:h-112 2xl:h-128 mt-8 flex h-72 items-center justify-center sm:h-80 sm:p-6 lg:mt-0 lg:h-96">
        <Stats />
      </div>
    </section>
  );
}
