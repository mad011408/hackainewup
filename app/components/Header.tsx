"use client";

import React from "react";
import Link from "next/link";
import { HackerAISVG } from "@/components/icons/hackerai-svg";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface HeaderProps {
  chatTitle?: string;
  hideDownload?: boolean;
}

const Header: React.FC<HeaderProps> = ({ chatTitle, hideDownload = false }) => {

  return (
    <header className="w-full px-6 max-sm:px-4 flex-shrink-0">
      {/* Desktop header */}
      <div className="py-[10px] flex gap-10 items-center justify-between max-md:hidden">
        <div className="flex items-center gap-2">
          <HackerAISVG theme="dark" scale={0.15} />
          <span className="text-foreground text-xl font-semibold">
            HackerAI
          </span>
        </div>
        <div className="flex flex-1 gap-2 justify-between items-center">
          {chatTitle && (
            <div className="flex-1 text-center">
              <span className="text-foreground text-lg font-medium truncate">
                {chatTitle}
              </span>
            </div>
          )}
          {!chatTitle && <div className="flex gap-[40px]"></div>}
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2 mr-2">
              <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full">
                PRO
              </span>
            </div>
            {!hideDownload && (
              <Button
                asChild
                variant="ghost"
                size="default"
                className="rounded-[10px]"
              >
                <Link href="/download">
                  <Download className="h-4 w-4 mr-1.5" />
                  Download
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="py-3 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-2">
          <HackerAISVG theme="dark" scale={0.12} />
          <span className="text-foreground text-lg font-semibold">
            HackerAI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full">
            PRO
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
