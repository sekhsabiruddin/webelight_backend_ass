// swaggerConfig.ts
import { Options } from 'swagger-jsdoc';

const options: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Webelight Backend Assignment API',
      version: '1.0.0',
      description: 'API documentation for Webelight Backend Assignment',
    },
  },
  // Path to your API routes
  apis: ['./routes/*.ts'],
};

export default options;
