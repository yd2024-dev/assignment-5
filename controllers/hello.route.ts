import { Controller, Get, Route, Path, Tags } from 'tsoa';

@Route('hello') // Adjust this if you have a base path
@Tags('Greeting')
export class HelloController extends Controller {
  @Get('{name}')
  public async greet(@Path() name: string): Promise<string> {
    return `Hello ${name}`;
  }
}

