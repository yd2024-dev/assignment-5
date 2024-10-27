#!/bin/bash

# Generate the OpenAPI specification and routes
npx tsoa spec-and-routes

# Generate the TypeScript Client SDK using the OpenAPI spec
npx @openapitools/openapi-generator-cli generate -i ./dist/swagger.json -o ./client -g typescript-fetch

if [ $? -eq 0 ]; then
  echo "Client SDK generated successfully!"
else
  echo "Failed to generate Client SDK."
fi
