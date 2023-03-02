import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CdkPipelinesStack } from './lib/cdk-pipelines';
import { envVars, validateEnvVariables } from './lib/config';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // define resources here...
  }
}

// for development, use account/region from cdk cli
export const devEnv = {
  // account: '037729278610',
  account: envVars.MASTER.ACCOUNT_ID,
  // region: process.env.CDK_DEFAULT_REGION,
  // region: 'ap-northeast-2',
  region: envVars.REGION,
};

validateEnvVariables();
const app = new App();

//new MyStack(app, 'my-stack-dev', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });
new CdkPipelinesStack(app, `${envVars.COMPANY_NAME}-${envVars.PROJECT_NAME}-Pipeline`,
  { env: devEnv } );

app.synth();