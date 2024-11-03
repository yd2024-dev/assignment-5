import Koa from 'koa';
import { koaSwagger } from 'koa2-swagger-ui'; // Ensure correct named import
import { swaggerDocument } from './swagger'; // Ensure the path is correct

const app = new Koa();

// Serve Swagger UI
app.use(koaSwagger({
    swaggerOptions: {
        spec: swaggerDocument, // Use your Swagger document
    },
}));

// Endpoint to serve the Swagger JSON
app.get('/swagger.json', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerDocument; // Ensure swaggerDocument is defined
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
