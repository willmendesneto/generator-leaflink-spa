/* eslint @typescript-eslint/no-var-requires: "off" */
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');

import { defineConfig } from 'cypress';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
  // This is required for handling multi-environments
  config = await setupEnvFile(config);

  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    }),
  );

  // This allow us to see cy.log on the terminal when running in headless mode
  on('task', {
    log(args: string) {
      console.log(...args);
      return null;
    },
  });

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  env: {
    video: false,
    environment: 'local',
    servicerUserName: 'e2e-staff-testing@leaflink.com',
  },

  e2e: {
    baseUrl: 'http://localhost:5174/deliveries',

    chromeWebSecurity: false,
    specPattern: 'cypress/e2e/*.feature',
    defaultCommandTimeout: 15000,

    setupNodeEvents,
  },

  projectId: 'wrvbef',
});

import { readFile } from 'fs';

async function setupEnvFile(config: Cypress.PluginConfigOptions): Promise<Cypress.PluginConfigOptions> {
  const environment = process.env.CONFIG_FILE || 'local';

  if (environment !== 'local') {
    const newConfig: Cypress.PluginConfigOptions & Record<string, unknown> = { ...config };
    const envConfig = await readEnvFile(environment);

    for (const key in config) {
      if (key === 'baseUrl' && process.env.CYPRESS_BASE_URL) {
        newConfig[key] = process.env.CYPRESS_BASE_URL;
      } else if (Object.prototype.hasOwnProperty.call(envConfig, key)) {
        newConfig[key] = envConfig[key];
      }
    }

    return newConfig;
  } else {
    return config;
  }
}

async function readEnvFile(environment: string): Promise<Record<string, unknown>> {
  return await new Promise<Record<string, unknown>>((resolve, reject) => {
    readFile(`${__dirname}/cypress/config/cypress.${environment}.json`, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(JSON.parse(data.toString()));
      }
    });
  });
}
