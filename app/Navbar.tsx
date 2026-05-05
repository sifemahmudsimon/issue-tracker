"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

import classnames from "classnames";

const Navbar = () => {
  const getCurrentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>

      <ul className="flex space-x-6">
        {links.map((link) => (
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
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
