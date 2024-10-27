// tests/setupServer.ts
import express from 'express';
import http from 'http';
import { AddressInfo } from 'net';
import { beforeEach, afterEach } from 'vitest';

export interface TestContext {
    address: string;
    close: () => void;
}

export const setupServer = () => {
    const app = express();
    let server: http.Server | null = null;

    beforeEach((done) => {
        server = app.listen(0, () => {
            const address = (server?.address() as AddressInfo).port;
            done();
        });
    });

    afterEach((done) => {
        if (server) {
            server.close(done);
            server = null;
        } else {
            done();
        }
    });

    return {
        get address() {
            return `http://localhost:${(server?.address() as AddressInfo).port}`;
        },
        close: () => {
            if (server) {
                server.close();
            }
        },
    };
};
