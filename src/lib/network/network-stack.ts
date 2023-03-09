import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NetworkConstruct } from './network-construct';

export interface NetworkStackProps extends cdk.StackProps {

}

export class NetworkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: NetworkStackProps) {
    super(scope, id, props);

    new NetworkConstruct(this, 'service-vpc');

  }
}