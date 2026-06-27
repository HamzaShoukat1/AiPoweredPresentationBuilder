import { inngest } from "#/integrations/inngest/client";
import { helloWorld } from "#/integrations/inngest/function";
import { createFileRoute } from "@tanstack/react-router";
// import { createServerFileRoute } from "@tanstack/react-start/server";
import { serve } from "inngest/edge";

const handler = serve({
    client: inngest,
    functions: [
        helloWorld,
        /* your functions will be passed here later! */
    ],
});

export const Route = createFileRoute("/api/inngest")({
    server: {
        handlers: {
            GET: async ({ request }) => handler(request),
            POST: async ({ request }) => handler(request),
            PUT: async ({ request }) => handler(request),
        },
    },
});