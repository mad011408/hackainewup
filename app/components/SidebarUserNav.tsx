"use client";

import React, { useState } from "react";
import {
  LifeBuoy,
  Github,
  Settings,
  Settings2,
  CircleUserRound,
  Download,
} from "lucide-react";
import Link from "next/link";
import { useGlobalState } from "@/app/contexts/GlobalState";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CustomizeHackerAIDialog } from "./CustomizeHackerAIDialog";
import { openSettingsDialog } from "@/lib/utils/settings-dialog";

const NEXT_PUBLIC_HELP_CENTER_URL =
  process.env.NEXT_PUBLIC_HELP_CENTER_URL || "https://help.hackerai.co/en/";

const XIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SidebarUserNav = ({ isCollapsed = false }: { isCollapsed?: boolean }) => {
  const [showCustomizeDialog, setShowCustomizeDialog] = useState(false);
  const isMobile = useIsMobile();

  const user = {
    id: "mock-user-id",
    email: "user@example.com",
    firstName: "Demo",
    lastName: "User",
    profilePictureUrl: null as string | null,
  };

  const getDisplayName = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.email.split("@")[0];
  };

  const handleHelpCenter = () => {
    const newWindow = window.open(
      NEXT_PUBLIC_HELP_CENTER_URL,
      "_blank",
      "noopener,noreferrer",
    );
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const handleGitHub = () => {
    const newWindow = window.open(
      "https://github.com/HackerAI",
      "_blank",
      "noopener,noreferrer",
    );
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  const handleXCom = () => {
    const newWindow = window.open(
      "https://x.com/HackerAI",
      "_blank",
      "noopener,noreferrer",
    );
    if (newWindow) {
      newWindow.opener = null;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isCollapsed ? (
          <div className="mb-1">
            <button
              data-testid="user-menu-button-collapsed"
              type="button"
              className="flex items-center justify-center p-2 cursor-pointer hover:bg-sidebar-accent/50 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full"
              aria-haspopup="menu"
              aria-label={`Open user menu for ${getDisplayName()}`}
            >
              <Avatar data-testid="user-avatar" className="h-7 w-7">
                <AvatarImage
                  src={user.profilePictureUrl || undefined}
                  alt={getDisplayName()}
                />
                <AvatarFallback className="text-xs">
                  {user.firstName?.[0]}
                  {user.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </button>
          </div>
        ) : (
          <button
            data-testid="user-menu-button"
            type="button"
            className="flex w-full items-center gap-2.5 rounded-xl p-2 cursor-pointer hover:bg-sidebar-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-haspopup="menu"
            aria-label={`Open user menu for ${getDisplayName()}`}
          >
            <Avatar data-testid="user-avatar" className="h-8 w-8">
              <AvatarImage
                src={user.profilePictureUrl || undefined}
                alt={getDisplayName()}
              />
              <AvatarFallback className="text-xs">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-sidebar-foreground truncate">
                {getDisplayName()}
              </div>
              <div
                data-testid="subscription-badge"
                className="text-xs text-sidebar-accent-foreground truncate"
              >
                Ultra
              </div>
            </div>
          </button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[calc(100%-12px)] rounded-2xl py-1.5"
        align="start"
        side="top"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal py-2.5">
          <div className="flex items-center space-x-2.5">
            <CircleUserRound className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <p
              data-testid="user-email"
              className="leading-none text-muted-foreground truncate min-w-0"
            >
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => openSettingsDialog()}
          className="py-2.5"
        >
          <Settings className="mr-2.5 h-5 w-5 text-foreground" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setShowCustomizeDialog(true)}
          className="py-2.5"
        >
          <Settings2 className="mr-2.5 h-5 w-5 text-foreground" />
          <span>Customize</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="py-2.5">
          <Download className="mr-2.5 h-5 w-5 text-foreground" />
          <span>Export Data</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleHelpCenter} className="py-2.5">
          <LifeBuoy className="mr-2.5 h-5 w-5 text-foreground" />
          <span>Help Center</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleGitHub} className="py-2.5">
          <Github className="mr-2.5 h-5 w-5 text-foreground" />
          <span>Source Code</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleXCom} className="py-2.5">
          <XIcon className="mr-2.5 h-5 w-5 text-foreground" />
          <span>Social</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { SidebarUserNav };
