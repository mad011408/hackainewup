import axiomClient from "@/lib/axiom/axiom";
import { Logger, AxiomJSTransport } from "@axiomhq/logging";
import { nextJsFormatters } from "@axiomhq/nextjs";

// Only create logger when Axiom is configured (avoids build-time crash)
export const nextJsAxiomLogger =
  axiomClient && process.env.AXIOM_DATASET
    ? new Logger({
        transports: [
          new AxiomJSTransport({
            axiom: axiomClient,
            dataset: process.env.AXIOM_DATASET,
          }),
        ],
        formatters: nextJsFormatters,
      })
    : (null as unknown as Logger);
