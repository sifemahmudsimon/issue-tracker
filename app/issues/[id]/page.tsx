import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/lib/prisma";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import delay from "delay";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
    <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap={"3"} my={"3"} align={"center"}>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose mt-4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Link href={`/issues/${issue.id}/edit`}>
          <Button className="!cursor-pointer">
            <Pencil2Icon />
            Edit Issue
          </Button>
        </Link>
      </Box>
    </Grid>
  );
}

export default IssueDetailPage;
