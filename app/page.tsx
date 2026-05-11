import { prisma } from "@/lib/prisma";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });

  console.log({ open, inProgress, closed });
  return (
    <>
      <LatestIssues />
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </>
  );
}
