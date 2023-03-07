const { AwsCdkTypeScriptApp } = require('projen');
const project = new AwsCdkTypeScriptApp({
  cdkVersion: '2.66.1',
  defaultReleaseBranch: 'main',
  name: 'cdk-landingzone-pipeline',

  cdkDependencies: [
  ], /* Which AWS CDK modules (those that start with "@aws-cdk/") this app uses. */
  context: {
  },
  deps: [
    'yamljs',
    'chalk',
    'path',
  ], /* Runtime dependencies of this module. */
  // description: undefined,            /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: [
    '@types/yamljs',
    // 'cdk-assume-role-credential-plugin',
  ], /* Build dependencies for this module. */
  // packageName: undefined,            /* The "name" in package.json. */
  // projectType: ProjectType.UNKNOWN,  /* Which type of project this is (library/app). */
  // releaseWorkflow: undefined,        /* Define a GitHub workflow for releasing from "main" when new versions are bumped. */
});
// project.cdkConfig.plugin = ['cdk-assume-role-credential-plugin'];
project.gitignore.addPatterns('diagram.png');
project.gitignore.addPatterns('diagram.dot');
project.synth();