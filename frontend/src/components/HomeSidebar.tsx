import { homeSidebarLink } from "@/constants/home-sidebar-links-constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const HomeSidebar = () => {
  return (
    <div className="sticky top-0 left-0 h-[100vh] w-64 rounded-r-sm bg-blue-500 p-8">
      <nav>
        <ul
          className={cn(
            // Mobile
            "flex w-full flex-row justify-around",
            // Desktop
            "lg:flex-col lg:justify-start lg:gap-y-8",
          )}
        >
          {homeSidebarLink.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className="flex flex-col items-center gap-y-1 lg:flex-row lg:items-center lg:gap-x-2"
              >
                {link.logo}
                <span className="text-sm lg:text-base">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HomeSidebar;
