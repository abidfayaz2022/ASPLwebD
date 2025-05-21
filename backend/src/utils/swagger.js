// utils/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Company Incorporation API',
      version: '1.0.0',
      description: 'API documentation for incorporation workflows, roles, and dashboards',
    },
    servers: [
      {
        url: 'http://localhost:3333', // Update if needed
        description: 'Local Dev Server',
      },
      {
        url: 'http://13.251.247.41:3333', // Update if needed
        description: 'Production Server',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'] // Path to files with Swagger annotations
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
