import * as cdk from '@aws-cdk/core';
import { StacksetAssumableRole } from './01-assumable-role';
// import { StacksetPasswordPolicy } from './02-password-policy';
import { StacksetConfig } from './03-config';
import { StacksetCloudtrail } from './04-cloudtrail';
import { StacksetGuarddutyMemberRole } from './05-guardduty-member';
//import { PasswordPolicy } from '../stac-sets/02-password-policy';
import { envVars } from '../config';
import { StacksetExecutionRoleConstruct } from '../service-accounts/stackset-execution-role-construct';

export interface StacksetStackProps extends cdk.StackProps {

}

export class StacksetStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: StacksetStackProps) {
    super(scope, id, props);

    envVars.SERVICE_ACCOUNTS.forEach(account => {
      if (account.Id == `${envVars.MASTER.ACCOUNT_ID}`
      || account.Id == `${envVars.LOG_ARCHIVE.ACCOUNT_ID}`) {
        return;
      }
      new StacksetExecutionRoleConstruct(this, 'StacksetExecutionRole', { stacksetRole: 'sub' });
    });

    new StacksetAssumableRole(this, 'assumable-role');

    // new StacksetPasswordPolicy(this, 'password-policy');

    new StacksetConfig(this, 'stackset-config');

    new StacksetCloudtrail(this, 'stackset-cloudtrail');

    new StacksetGuarddutyMemberRole(this, 'guardduty-member');


  }
}