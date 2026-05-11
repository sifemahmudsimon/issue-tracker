import { prisma } from "@/lib/prisma";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./components";

async function LatestIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size={"4"} mb={"5"}>
        Latest Issue
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex direction={"column"} align={"start"}>
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <IssueStatusBadge status={issue.status} />
                </Flex>
              </Table.Cell>
              <Table.Cell>
                {issue.assignedToUserId && (
                  <Avatar
                    src={issue.assignedToUser!.image!}
                    fallback="?"
                    size={"2"}
                    radius="full"
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
}

export default LatestIssues;
