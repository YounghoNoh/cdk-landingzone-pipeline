import * as guardduty from 'aws-cdk-lib/aws-guardduty';
import { Construct } from 'constructs';
import { envVars } from '../config';

export interface GuarddutyMainProps {

}

export class GuardDutyMainConstruct extends Construct {
  constructor(scope: Construct, id: string ) {
    super(scope, id);

    const cfnDetector = new guardduty.CfnDetector(this, 'GuardDutyDetector', {
      enable: true,
      findingPublishingFrequency: `${envVars.GUARD_DUTY_PUBLISH_FREQUENCY}`,
    });

    envVars.SERVICE_ACCOUNTS.forEach(account => {
      if (account.Id == `${envVars.MASTER.ACCOUNT_ID}`) {
        return;
      }
      var cfnMember = new guardduty.CfnMember(this, `GuardDutyMember${account.Id}`, {
        detectorId: cfnDetector.ref,
        email: account.Email,
        memberId: account.Id,
        // the properties below are optional
        disableEmailNotification: false,
        message: 'You are invited to enable Amazon Guardduty',
        status: 'Invited',
      });
      cfnMember.addDependency(cfnDetector);
    });
  }
}