"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function StatusSelect({ issue }: { issue: Issue }) {
  const router = useRouter();
  const statuses = Object.values(Status).map((status) => ({
    label: status.replace("_", " "),
    value: status,
  }));

  const changeStatus = (status: string) => {
    axios
      .patch("/api/issues/" + issue.id, {
        status: status,
      })
      .then(() => router.refresh())
      .catch(() => {
        toast.error("Changes could not be saved.");
      });
  };

  return (
    <Select.Root defaultValue={issue.status} onValueChange={changeStatus}>
      <Select.Trigger placeholder="Set Status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default StatusSelect;
