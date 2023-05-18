import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();

const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Petbook API',
        description: 'API documentation for Petbook server',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:9090/',
        },
      ],
      components: {
        schemas: {
          User: {
          
            $ref: 'file:///C:/Users/Dali/Documents/GitHub/Champions_Clash/backend/models/user.js', // Path to the User model definition
          },
        },
      },
    },
    apis: ['./routes/*.js'], // Specify the path to your API route files
  };
  
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
