import Koa from 'koa';
import KoaRouter from '@koa/router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import qs from 'koa-qs';
import { RegisterRoutes } from './dist/routes';
import * as swaggerUi from 'koa2-swagger-ui'; // Use import * as
import swaggerDoc from './dist/swagger.json';

const app = new Koa();
const router = new KoaRouter();

// Middleware setup
app.use(bodyParser());
app.use(cors());
qs(app); // Enable query-string support

// Register routes
RegisterRoutes(router);

// Swagger setup
app.use(swaggerUi.koaSwagger({
    routePrefix: '/docs', // Route for the Swagger UI
    swaggerOptions: {
        spec: swaggerDoc, // Use the imported swagger.json directly
    },
}));

// Error handling middleware
app.use(async (context, next) => {
    try {
        await next();
    } catch (err: any) {
        console.error("Error occurred:", err);
        context.status = err.status || 500;
        context.body = err.message || 'An error occurred during the request.';
    }
});

// Use registered routes
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

