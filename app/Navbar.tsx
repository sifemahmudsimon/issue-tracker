"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container, Flex, Spinner } from "@radix-ui/themes";

const Navbar = () => {
  const getCurrentPath = usePathname();
  const { status, data: session } = useSession();

  console.log("status", status);
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href="/">
              <AiFillBug />
            </Link>

            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    key={link.label}
                    href={link.href}
                    className={classnames({
                      "text-zinc-900": link.href === getCurrentPath,
                      "text-zinc-500": link.href !== getCurrentPath,
                      "hover:text-zinc-800 transition-colors": true,
                    })}
                    // className={`${(link.href = getCurrentPath
                    //   ? "text-zinc-900"
                    //   : "text-zinc-500")} text-zinc-500 hover:text-zinc-800 transition-colors`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "loading" && <Spinner />}
            {status === "authenticated" && (
              <Link href={"/api/auth/signout"}>Logout</Link>
            )}
            {status === "unauthenticated" && (
              <Link href={"/api/auth/signin"}>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
