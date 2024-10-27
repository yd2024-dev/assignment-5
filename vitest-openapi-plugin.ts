import { defineConfig } from 'vitest/config';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

// Wrapping the exec function in a Promise to allow async/await
const execAsync = promisify(exec);

// Function to generate the OpenAPI client SDK
async function generateOpenApi(): Promise<void> {
  try {
    console.log('Generating OpenAPI client SDK...');
    await execAsync('./generate-client-sdk.sh');
    console.log('OpenAPI client SDK generated successfully.');
  } catch (error) {
    console.error('Failed to generate OpenAPI client SDK:', error);
    process.exit(1); // Exit if generation fails
  }
}

// Object to manage the state of the OpenAPI generation process
const openApiReady = { promise: Promise.resolve(), ready: true };

// Vitest plugin
export default {
  name: 'vitest-openapi-plugin',
  
  // Wait for initial generation to complete before starting tests
  buildStart: async () => {
    await openApiReady.promise;
    openApiReady.ready = true;
  },

  // Wait for current generation to finish before loading tests
  load: async () => {
    while (!openApiReady.ready) {
      await openApiReady.promise;
    }
  },

  // Handle file changes to trigger OpenAPI generation
  watchChange: async () => {
    openApiReady.ready = false;
    
    const promise = generateOpenApi();
    openApiReady.promise = promise;
    
    await promise;
    
    if (openApiReady.promise === promise) {
      openApiReady.ready = true;
    }
  }
};
