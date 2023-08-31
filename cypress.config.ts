import { defineConfig } from 'cypress'

export default defineConfig({
  
  e2e: {
    'baseUrl': 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx,feature}'
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
   specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx,feature}',
  }
  
})