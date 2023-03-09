import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { envVars } from '../config';
import { StacksetExecutionRoleStack } from '../service-accounts/stackset-execution-role-stack';

export interface StacksetExecutionRoleProps extends cdk.StageProps{

}

export class StacksetExecutionRoleStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props: StacksetExecutionRoleProps) {
    super(scope, id, props);

    const masterStack = new StacksetExecutionRoleStack(this, `Master-StackSetRole`, {
      env: {
        account: envVars.MASTER.ACCOUNT_ID,
        region: envVars.REGION
      },
      stacksetRole: 'admin'
    });

    for (let account of envVars.SERVICE_ACCOUNTS) {
      if(account.Id != envVars.MASTER.ACCOUNT_ID){
        // stack
        const subStack = new StacksetExecutionRoleStack(this, `${account.Name}-StackSetRole`, {
          env: {
            account: account.Id,
            region: envVars.REGION
          },
          stacksetRole: 'sub'
        });
        subStack.addDependency(masterStack);
      }

    }

  }
}