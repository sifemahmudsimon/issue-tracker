import { Text } from "@radix-ui/themes";
import React, { PropsWithChildren, ReactNode } from "react";

function ErrorMessage({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <Text color="red" as="p" className="pb-3">
      {children}
    </Text>
  );
}

export default ErrorMessage;
