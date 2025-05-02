export type TxnAction = 'start' | 'resume' | 'close';
export type TxnResponse = {
    status: 'pending' | 'complete' | 'closed' | 'error';
    token: string;
    payload?: unknown;
    expiresAt?: string | null;
    error?: string;
};
export declare function runServer(): Promise<void>;
