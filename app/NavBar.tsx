"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  const currentPath = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className="flex space-x-6 border-b-2 mb-2 p-4 h-16 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6 ">
        {links.map((link) => (
          <li>
            <Link
              key={link.href}
              className={classNames(
                { "text-zinc-900": link.href === currentPath },
                { "text-zinc-500": link.href !== currentPath },
                { "hover:text-zinc-800 transition-colors": true }
              )}
              // className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500'} hover:text-zinc-800 transition-colors`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        { status === "authenticated" && (<Link href="/api/auth/signout">Log Out</Link>)}
        { status === "unauthenticated" && (<Link href="/api/auth/signin">Log In</Link>)}
      </Box>
    </nav>
  );
};

export default NavBar;
