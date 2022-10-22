import swaggerJsDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "This is a simple API for authentication and authorization.",
      contact: {
        name: "API Support",
        url: "https://github.com/benidevo",
        email: "benidevoo@gmail.com",
      },
    },

    servers: [
      {
        url: "http://localhost:8000/v1",
        description: "Auth API Documentation",
      },
    ],
  },
  apis: [
    "./src/v1/modules/auth/routes.js",
    "./src/v1/modules/auth/controllers/*.js",
  ],
};

export default swaggerJsDoc(options);
