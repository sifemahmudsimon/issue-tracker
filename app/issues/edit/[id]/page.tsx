import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: {
    id: string;
  };
}
async function EditIssuePage({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();
  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
