import axiomClient from "@/lib/axiom/axiom";
import { Logger, AxiomJSTransport } from "@axiomhq/logging";

// Only create logger when Axiom is configured (avoids build-time crash)
export const triggerAxiomLogger =
  axiomClient && process.env.AXIOM_DATASET
    ? new Logger({
        transports: [
          new AxiomJSTransport({
            axiom: axiomClient,
            dataset: process.env.AXIOM_DATASET,
          }),
        ],
      })
    : (null as unknown as Logger);
