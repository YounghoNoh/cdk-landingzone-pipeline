import { Construct } from "constructs";
import * as iam from 'aws-cdk-lib/aws-iam';
import { envVars } from '../config';

export interface AssumeRoleConstructProps {

}

export class AssumeRoleConstruct extends Construct {
  constructor(scope: Construct, id: string ) {
    super(scope, id);

    const ROLES = [
      'Admin',
      'Developer',
      'CloudFormationDeveloper',
      'ReadOnly',
      'SecurityAudit',
      'Operations',
      'AwsPowerUser',
      'AwsSupportUser',
    ];

    for (let Account of envVars.SERVICE_ACCOUNTS) {
      for (let Role of ROLES ) {

        var group = new iam.Group(this, `${Role}Group${Account.Id}`, {
          groupName: `Assume${Role}_${Account.Name}_${Account.Id}`,
          path: '/assume/',
        });

        var doc = new iam.PolicyDocument();
        var p = new iam.PolicyStatement();
        p.effect = iam.Effect.ALLOW;
        p.addActions( 'sts:AssumeRole' );
        p.addResources(`arn:aws:iam::${Account.Id}:role/Assumable${Role}Role`);
        doc.addStatements(p);

        var policy = new iam.Policy(this, `${Role}Policy${Account.Id}`, {
          policyName: `${Role}Policy${Account.Id}`,
          document: doc,
        });

        group.attachInlinePolicy(policy);
      }
    }

  }
}