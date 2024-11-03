// tests/placeholder.spec.ts
import { setupServer, TestContext } from './serverTestHelper';
import { DefaultApi, Configuration } from './client/apis/GreetingApi'; // Adjust this import as necessary

describe('Placeholder Route', () => {
    let context: TestContext;

    beforeEach(async () => {
        context = await setupServer();
    });

    afterEach(async () => {
        await context.close();
    });

    it('should return a placeholder message', async () => {
        const client = new DefaultApi(new Configuration({ basePath: context.address }));
        const response = await client.getPlaceholder(); // Adjust to your API client method

        expect(response.status).toBe(200);
        expect(response.data).toEqual({ message: 'This is a placeholder route.' });
    });
});
