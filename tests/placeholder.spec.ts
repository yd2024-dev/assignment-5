// tests/placeholder.spec.ts
import { setupServer } from './setupServer';
import { DefaultApi, Configuration } from './client/apis/GreetingApi'; // Adjust to your actual API client import
import placeholderRoutes from './dist/routes'; // Adjust to your routes file

const { address, close } = setupServer();

describe('Placeholder Route', () => {
    const server = setupServer();
    const client = new DefaultApi(new Configuration({ basePath: server.address }));

    beforeEach(() => {
        server.app.use('/', placeholderRoutes); // Use the placeholder routes
    });

    afterEach(() => {
        server.close();
    });

    it('should return a placeholder message', async () => {
        const response = await client.getPlaceholder(); // Adjust to your API client method
        expect(response.status).toBe(200);
        expect(response.data).toEqual({ message: 'This is a placeholder route.' });
    });
});
