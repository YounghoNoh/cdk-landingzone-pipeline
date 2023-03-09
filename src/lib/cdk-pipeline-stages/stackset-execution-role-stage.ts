import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { envVars } from '../config';
import { StacksetExecutionRoleStack } from '../service-accounts/stackset-execution-role-stack';

export interface StacksetExecutionRoleProps extends cdk.StageProps{

}

export class StacksetExecutionRoleStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props: StacksetExecutionRoleProps) {
    super(scope, id, props);

    let stacksetRole = 'sub';

    for (let account of envVars.SERVICE_ACCOUNTS) {
      if(account.Id == envVars.MASTER.ACCOUNT_ID){
        stacksetRole = 'admin';
      }

      // stack
      new StacksetExecutionRoleStack(this, `${account.Name}-StackSetRole-${stacksetRole}`, {
        env: {
          account: account.Id,
          region: envVars.REGION
        },
        stacksetRole: stacksetRole
      });

    }

  }
}