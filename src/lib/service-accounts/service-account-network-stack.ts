import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'

export interface ServiceAccountNetworkStackProps extends cdk.StackProps {

}

export class ServiceAccountNetworkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ServiceAccountNetworkStackProps) {
    super(scope, id, props);

    new ec2.Vpc(this, `service-vpc-${props.env?.account}`)

  }
}