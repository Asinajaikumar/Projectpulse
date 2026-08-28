import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ProjectPulse REST API Documentation',
      version: '1.0.0',
      description: 'Interactive OpenAPI specification for ProjectPulse Project Monitoring & AI Deadline Prediction API.',
      contact: {
        name: 'ProjectPulse Engineering Team',
        url: 'https://projectpulse.io'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Local Development Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your Supabase JWT or demo access token'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js', './src/server.js']
};

export const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
