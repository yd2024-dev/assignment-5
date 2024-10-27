import { defineConfig } from 'vitest/config';
import vitestOpenApiPlugin from './vitest-openapi-plugin'; // Your OpenAPI plugin

export default defineConfig({
  plugins: [vitestOpenApiPlugin], // Integrate the OpenAPI generation plugin
  test: {
    includeSource: ['src/**/*.{js,ts}'],  // Include source files
    setupFiles: ['./database_test_setup.ts'], // Setup files before tests
    exclude: [
      'client/**', // Exclude the client folder
      'dist/**' // Exclude the dist folder
    ]
  }
});
