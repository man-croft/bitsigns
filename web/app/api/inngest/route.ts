import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { generateAvatar } from "@/inngest/functions/generate-avatar";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    generateAvatar,
  ],
});
