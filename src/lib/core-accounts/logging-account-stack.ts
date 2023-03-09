import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import { ServiceAccountNetworkConstruct } from '../service-accounts/service-account-network-construct';
// import { StacksetExecutionRoleConstruct } from '../service-accounts/stackset-execution-role-construct';
//import { IamGroupConstruct } from './iam-group-construct';
import { LogArchiveConstruct } from './log-archive-construct';

export interface LoggingAccountStackProps extends cdk.StackProps {

}

export class LoggingAccountStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LoggingAccountStackProps) {
    super(scope, id, props);

    // new StacksetExecutionRoleConstruct(this, 'StacksetExecutionRole', { stacksetRole: 'sub' });

    new LogArchiveConstruct(this, 'log-archive');

    // new ServiceAccountNetworkConstruct(this, 'log-vpc');

    // env target account : log archive
    //new IamGroupConstruct(this, 'iam-group');

  }
}