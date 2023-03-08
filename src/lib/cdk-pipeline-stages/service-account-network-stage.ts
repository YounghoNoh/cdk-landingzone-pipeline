import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ServiceAccountNetworkStack } from '../service-accounts/service-account-network-stack';
import { envVars } from '../config';

export interface ServiceAccountNetworkStageProps extends cdk.StageProps{

}

export class ServiceAccountNetworkStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props: ServiceAccountNetworkStageProps) {
    super(scope, id, props);

    /**
     * NOTE: Add DefaultStackSynthesizer to stack
     */
    /* new MyTemplateStack(this, 'audit', {
      synthesizer: new cdk.DefaultStackSynthesizer({ qualifier: 'jingo12345' }),
      env: devEnv,
    }); */
    // new ServiceAccountNetworkStack(this, 'Sub1', props);
    new ServiceAccountNetworkStack(this, `${props.env?.account}-vpc`, {});

    /* new LoggingAccountStack(this, 'logging', {
      //synthesizer: new cdk.DefaultStackSynthesizer({ qualifier: 'jingo12345' }),
      env: { account: '037729278610', region: 'ap-northeast-2' },
    }); */
    for (let account of envVars.SERVICE_ACCOUNTS) {
      new ServiceAccountNetworkStack(this, `${account.Name}-vpc`, {
        env: {
          account: account.Id,
          region: envVars.REGION
        }
      });
    }
  }
}