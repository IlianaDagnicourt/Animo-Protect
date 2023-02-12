const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
    info: {
        version: '1.0.0',
        title: 'AnimoProtect',
        description: `
        API qui permet la publication d'annonces venant d'association
        et permet au benevole d'y repondre`,
        license: {
            name: 'MIT',
        },
    },
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: '../../app/**/*.js',
    // [
    //     '../clients/*.js',
    //     '../controllers/**/*.js',
    //     '../errors/*.js',
    //     '../helpers/*.js',
    //     '../middlewares/*.js',
    //     '../models/*.js',
    //     '../routers/**/*.js',
    //     '../services/*.js',
    //     '../validation/**/*.js'
    // ], // Tous ce qui se trouve dans /app

    // URL where SwaggerUI will be rendered
    swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE ?? '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: true,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/v3/api-docs',
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
};

module.exports = (app) => expressJSDocSwagger(app)(options);

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns Express JSDoc Swagger middleware that create web documentation
 */