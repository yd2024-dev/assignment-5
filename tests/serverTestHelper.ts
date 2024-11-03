// tests/serverTestHelper.ts
import { startServer } from '../serverLauncher';
import http from 'http';

export interface TestContext {
    address: string;
    close: () => void;
}

export const setupServer = async (): Promise<TestContext> => {
    const server = await startServer(0); // Use a random available port
    const address = `http://localhost:${(server.address() as http.AddressInfo).port}`;

    return {
        address,
        close: () => new Promise<void>((resolve) => server.close(resolve)),
    };
};
