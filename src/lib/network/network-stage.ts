import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NetworkStack } from './network-stack';

export interface NetworkStageProps extends cdk.StageProps{

}

export class NetworkStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props: NetworkStageProps) {
    super(scope, id, props);

    new NetworkStack(this, 'service-account-vpc', {});

  }
}