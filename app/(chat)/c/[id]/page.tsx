"use client";

import { Chat } from "../../../components/chat";
import PricingDialog from "../../../components/PricingDialog";
import { usePricingDialog } from "../../../hooks/usePricingDialog";
import { useGlobalState } from "../../../contexts/GlobalState";
import { use } from "react";

export default function Page(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const chatId = params.id;
  const { subscription } = useGlobalState();
  const { showPricing, handleClosePricing } = usePricingDialog(subscription);

  return (
    <>
      <Chat key={chatId} chatId={chatId} autoResume={true} />
      <PricingDialog isOpen={showPricing} onClose={handleClosePricing} />
    </>
  );
}
