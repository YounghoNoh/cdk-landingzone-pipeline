import * as guardduty from 'aws-cdk-lib/aws-guardduty';
import { Construct } from 'constructs';
import { envVars } from '../config';

export interface GuardDutyMemberProps {

}

export class GuardDutyMember extends Construct {
  constructor(scope: Construct, id: string ) {
    super(scope, id);

    const cfnDetector = new guardduty.CfnDetector(this, 'GuardDutyDetector', {
      enable: true,
      findingPublishingFrequency: `${envVars.GUARD_DUTY_PUBLISH_FREQUENCY}`,
    });

    const cfnMaster = new guardduty.CfnMaster(this, 'GuardDutyMaster', {
      detectorId: cfnDetector.ref,
      masterId: `${envVars.MASTER.ACCOUNT_ID}`,
      //invitationId: 'invitationId',
    });

    cfnMaster.addDependsOn(cfnDetector);
  }
}