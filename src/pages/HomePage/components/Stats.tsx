import { type PropsWithChildren } from "react";

export function Stats() {
  return (
    <section className="mx-auto grid grid-cols-3 justify-center text-center">
      <StatItem label="Players">123</StatItem>
      <StatItem label="Total Clicks">82k</StatItem>
      <StatItem label="Average Highscore">11.2</StatItem>
    </section>
  );
}

function StatItem({ label, children }: PropsWithChildren<{ label: string }>) {
  return (
    <div className="m-2 flex flex-col gap-2 justify-start lg:m-6">
      <p className="leadi text-3xl font-bold md:text-4xl lg:text-6xl">{children}</p>
      <p className="text-sm sm:text-base">{label}</p>
    </div>
  );
}
