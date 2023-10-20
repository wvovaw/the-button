import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from "@/components/ui/Table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { type RecordData } from "@/api/types";
import { useLeaderboard } from "./hooks/useLeaderboard";

export default function LeadersTable() {
  const { leaderboard, nextPage, prevPage } = useLeaderboard();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Attempts</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard?.data.map((record: RecordData, ix: number) => (
            <TableRow key={record.id}>
              <TableCell>{ix}</TableCell>
              <TableCell>{record.owner.name}</TableCell>
              <TableCell>{record.highScore}</TableCell>
              <TableCell>{record.totalAttempts}</TableCell>
              <TableCell>{record.updatedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="float-right space-x-4">
        <Button variant="outline" size="icon" onClick={() => prevPage()}>
          <ChevronLeft />
        </Button>
        <Button variant="outline" size="icon" onClick={() => nextPage()}>
          <ChevronRight />
        </Button>
      </div>
    </>
  );
}
