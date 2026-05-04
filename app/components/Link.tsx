import React from "react";
import NextLink from "next/link";
import { Link as RadiaxLink } from "@radix-ui/themes";

interface Props {
  href: string;
  children: string;
}

function Link({ href, children }: Props) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadiaxLink>{children}</RadiaxLink>
    </NextLink>
  );
}

export default Link;
