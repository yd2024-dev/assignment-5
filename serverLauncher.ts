import Koa from 'koa';
import KoaRouter from '@koa/router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import qs from 'koa-qs';
import { RegisterRoutes } from './dist/routes';
import * as swaggerUi from 'koa2-swagger-ui';
import swaggerDoc from './dist/swagger.json';
import http from 'http';

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
    routePrefix: '/docs',
    swaggerOptions: {
        spec: swaggerDoc,
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

// Export function to start the server
export function startServer(port: number = 0): Promise<http.Server> {
    return new Promise((resolve, reject) => {
        const server = app.listen(port, (err?: Error) => {
            if (err) {
                reject(err);
            } else {
                console.log(`Server is running on http://localhost:${server.address().port}`);
                resolve(server);
            }
        });
    });
}
