import { type RecordData } from "@/api/types";
import { useLeaderboard } from "./hooks/useLeaderboard";

export default function LeadersTable() {
  const { leaderboard, isLoading, nextPage, prevPage } = useLeaderboard();

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>№</td>
            <td>Name</td>
            <td>Score</td>
            <td>Attempts</td>
            <td>Updated</td>
          </tr>
        </thead>
        <tbody>
          {leaderboard?.data.map((record: RecordData, ix: number) => (
            <tr key={record.id}>
              <td>{ix}</td>
              <td>{record.owner.name}</td>
              <td>{record.highScore}</td>
              <td>{record.totalAttempts}</td>
              <td>{record.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
