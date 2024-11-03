// tests/hello.route.spec.ts
/// <reference types="vitest" />

import { startServer } from './serverTestHelper'; // Your server setup helper
import { DefaultApi, Configuration } from './client/apis/GreetingApi'; // Adjust the import as necessary

const PORT = 0; // Let the system choose an available port

describe('HelloController', () => {
    let server: any; // Declare server outside the beforeEach
    let serverAddress: string;
    let client: DefaultApi;

    // Setup the server before each test
    beforeEach(async () => {
        server = await startServer(PORT); // Start the server
        serverAddress = `http://localhost:${(server.address() as any).port}/api/hello`; // Get the server address
        client = new DefaultApi(new Configuration({ basePath: serverAddress })); // Initialize client
    });

    // Close the server after each test
    afterEach(async () => {
        if (server) {
            await server.close(); // Ensure server is closed after tests
        }
    });

    it('should greet the user with their name', async () => {
        const name = 'World';
        const response = await client.greet(name); // Adjust according to your client SDK method
        
        expect(response).toBe(`Hello ${name}`); // Check if the response is correct
    });
});
