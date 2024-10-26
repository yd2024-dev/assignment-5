//declare module 'koa2-swagger-ui' {
    //import Koa from 'koa';
  
    //interface SwaggerOptions {
      //spec?: any; // Refine this type based on your Swagger structure if needed
    //}
  
    //interface KoaSwaggerOptions {
      //routePrefix?: string;
      //specPrefix?: string;
      //exposeSpec?: boolean;
      //swaggerOptions?: SwaggerOptions;
    //}
  
    // Default export function
    //export default function koaSwagger(options: KoaSwaggerOptions): Koa.Middleware;
  //}
  //
  // @types/koa2-swagger-ui/index.d.ts
declare module 'koa2-swagger-ui' {
    import Koa from 'koa';
  
    interface SwaggerOptions {
      spec?: any; // You can refine this type based on your swagger structure
    }
  
    interface KoaSwaggerOptions {
      routePrefix?: string;
      swaggerOptions?: SwaggerOptions;
    }
  
    export default function koaSwagger(options: KoaSwaggerOptions): Koa.Middleware;
  }
  