import { Axiom } from "@axiomhq/js";

// Create Axiom client only when token is available (avoids build-time crash)
const axiomClient = process.env.AXIOM_TOKEN
  ? new Axiom({ token: process.env.AXIOM_TOKEN })
  : (null as unknown as Axiom);

export default axiomClient;
