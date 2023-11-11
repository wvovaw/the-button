import { useState } from "react";
import { StatisticsResponseData } from "@/api/types";
import { getStatistics } from "@/api/services/getStatistics";
import { useEffectOnce } from "@/hooks/usehooks-ts";
import { shorthandNumber } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/Tooltip";

export function Stats() {
  const [stats, setStats] = useState<StatisticsResponseData | null>(null);

  useEffectOnce(() => {
    (async function () {
      const statistics = await getStatistics();
      setStats(statistics);
    })();
  });

  return (
    <section className="mx-auto grid grid-cols-3 justify-center text-center">
      <StatItem label="Players" val={stats?.playersCount ?? 0} />
      <StatItem label="Total Clicks" val={stats?.totalClicks ?? 0} />
      <StatItem label="Average Highscore" val={stats?.avgHighscore ?? 0} />
    </section>
  );
}

function StatItem({ label, val }: {label: string, val: number }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="m-2 flex flex-col justify-start gap-2 lg:m-6">
            <p className="leadi text-3xl font-bold md:text-4xl lg:text-6xl">{shorthandNumber(val)}</p>
            <p className="text-sm sm:text-base">{label}</p>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {val}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
