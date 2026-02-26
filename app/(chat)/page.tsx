"use client";

import React from "react";
import { Chat } from "../components/chat";
import PricingDialog from "../components/PricingDialog";
import TeamPricingDialog from "../components/TeamPricingDialog";
import { TeamWelcomeDialog } from "../components/TeamDialogs";
import MigratePentestgptDialog from "../components/MigratePentestgptDialog";
import { usePricingDialog } from "../hooks/usePricingDialog";
import { useGlobalState } from "../contexts/GlobalState";
import { usePentestgptMigration } from "../hooks/usePentestgptMigration";

// Main page component - always authenticated with mock user
export default function Page() {
  const {
    subscription,
    teamPricingDialogOpen,
    setTeamPricingDialogOpen,
    teamWelcomeDialogOpen,
    setTeamWelcomeDialogOpen,
    migrateFromPentestgptDialogOpen,
    setMigrateFromPentestgptDialogOpen,
  } = useGlobalState();
  const { showPricing, handleClosePricing } = usePricingDialog(subscription);

  const { isMigrating, migrate } = usePentestgptMigration();
  const searchParams =
    typeof window !== "undefined" ? window.location.search : "";
  const { initialSeats, initialPlan } = React.useMemo(() => {
    if (typeof window === "undefined") {
      return { initialSeats: 5, initialPlan: "monthly" as const };
    }
    const urlParams = new URLSearchParams(searchParams);
    const urlSeats = urlParams.get("numSeats");
    const urlPlan = urlParams.get("selectedPlan");

    let seats = 5;
    if (urlSeats) {
      const parsed = parseInt(urlSeats, 10);
      if (!isNaN(parsed) && parsed >= 1) {
        seats = parsed;
      }
    }

    const plan = (urlPlan === "yearly" ? "yearly" : "monthly") as
      | "monthly"
      | "yearly";

    return { initialSeats: seats, initialPlan: plan };
  }, [searchParams]);

  return (
    <>
      <Chat autoResume={false} />
      <PricingDialog isOpen={showPricing} onClose={handleClosePricing} />
      <TeamPricingDialog
        isOpen={teamPricingDialogOpen}
        onClose={() => setTeamPricingDialogOpen(false)}
        initialSeats={initialSeats}
        initialPlan={initialPlan}
      />
      <TeamWelcomeDialog
        open={teamWelcomeDialogOpen}
        onOpenChange={setTeamWelcomeDialogOpen}
      />
      <MigratePentestgptDialog
        open={migrateFromPentestgptDialogOpen}
        onOpenChange={setMigrateFromPentestgptDialogOpen}
        isMigrating={isMigrating}
        onConfirm={migrate}
      />
    </>
  );
}
