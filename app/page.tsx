import { prisma } from "@/lib/prisma";
import Pagination from "./components/Pagination";
import IssueSumarry from "./IssueSumarry";
import LatestIssues from "./LatestIssues";

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
      <IssueSumarry open={open} inProgress={inProgress} closed={closed} />
    </>
  );
}
