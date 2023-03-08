// import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface ServiceAccountNetworkConstructProps {

}

export class ServiceAccountNetworkConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // new ec2.Vpc(this, `service-vpc-${props.env?.account}`);
    new ec2.Vpc(this, 'service-vpc');

  }
}