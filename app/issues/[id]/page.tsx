export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { Metadata } from "next";
import { describe } from "zod/v4/core";

interface Props {
  params: {
    id: string;
  };
}

async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  console.log("Session:", session);

  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    return notFound();
  }

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction={"column"} gap={"4"}>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
