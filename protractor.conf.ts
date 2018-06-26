import { browser, Config } from 'protractor';

export const config: Config = {

    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

    SELENIUM_PROMISE_MANAGER: false,

    baseUrl: 'https://www.google.com',

    capabilities: {
        browserName: 'chrome',
    },

    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        './test/features/*.feature',
    ],

    onPrepare: () => {
        browser.ignoreSynchronization = true;
        browser.manage().window().maximize();
    },

    cucumberOpts: {
        compiler: 'ts:ts-node/register',
        require: ['../../dist/test/steps/*.js'],
        strict: true,
        tags: '@CucumberScenario or @ProtractorScenario or @TypeScriptScenario or @OutlineScenario',
    },
};