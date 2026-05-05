import { prisma } from "@/lib/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

interface Props {
  params: {
    id: string;
  };
}

async function IssueDetailPage({ params }: Props) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    return notFound();
  }

  await delay(1500); // Simulate loading delay
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap={"5"}>
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction={"column"} gap={"4"}>
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
}

export default IssueDetailPage;
