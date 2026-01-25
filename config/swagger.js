import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Terhal",
      version: "1.0.0",
      description: "API documentation for Tour guide  project",
    },
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
      { bearerAuth: [] }
    ],
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'local server',
      },
        {
        url: 'https://backend-mu-ten-26.vercel.app',
        description: 'Production server',
      },
    ],
  },
  // Use path.join to create an absolute path to your routes
  apis: [path.join(__dirname, "../routes/*.js")], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;