#!/usr/bin/env node
import { z } from "zod";
export declare const configSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export default function createServer({ config, }: {
    config: z.infer<typeof configSchema>;
}): import("@modelcontextprotocol/sdk/server").Server<{
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
        } | undefined;
    } | undefined;
}, {
    method: string;
    params?: {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
        } | undefined;
    } | undefined;
}, {
    [x: string]: unknown;
    _meta?: {
        [x: string]: unknown;
    } | undefined;
}>;
