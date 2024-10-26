import Koa from 'koa';
//import koaSwagger from 'koa2-swagger-ui';
import * as koaSwagger from 'koa2-swagger-ui';
console.log('koaSwagger:', koaSwagger);


const app = new Koa();

app.use(koaSwagger.koaSwagger({
    routePrefix: '/docs',
    swaggerOptions: {
        spec: swaggerDoc,
    },
}));


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
