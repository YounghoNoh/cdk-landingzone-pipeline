import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StacksetExecutionRoleConstruct } from './stackset-execution-role-construct';

export interface StacksetExecutionRoleStackProps extends cdk.StackProps {
  stacksetRole: string;
}

export class StacksetExecutionRoleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: StacksetExecutionRoleStackProps) {
    super(scope, id, props);

    new StacksetExecutionRoleConstruct(this, 'ExecutionRole', props);

  }
}