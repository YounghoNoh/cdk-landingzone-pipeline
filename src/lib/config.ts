import * as chalk from 'chalk';
import * as YAML from 'yamljs';

export const envVars = {
  REGION: process.env.REGION || 'ap-northeast-2',
  COMPANY_NAME: 'acme',
  PROJECT_NAME: 'landingZone',
  SOURCE_PROVIDER: 'GITHUB',
  // REPO: process.env.REPO_NAME || 'jingood2/cdk-landingzone-pipeline',
  REPO: process.env.REPO_NAME || 'YounghoNoh/cdk-landingzone-pipeline',
  BRANCH: 'awstf-rnd',
  // GITHUB_TOKEN: 'atcl/jingood2/github-token',
  GITHUB_TOKEN: 'cdk-landingzone-pipeline/github-token',
  MASTER: {
    // ACCOUNT_ID: '037729278610',
    ACCOUNT_ID: '484752921218',
    REQUIRE_MFA_ON_MAIN_ACCOUNT_ACTION: 'true',
  },
  LOG_ARCHIVE: {
    // ACCOUNT_ID: '318126949465',
    ACCOUNT_ID: '484752921218',
    BUCKET_PREFIX: 'acme-audit',
    /*  One_Hour
        Three_Hours
        Six_Hours
        Twelve_Hours
        TwentyFour_Hours
    */
    DELIVERY_FREQUENCY: 'Twelve_Hours',
  },
  SERVICE: {
    // LIST_OF_ACCOUNTS: ['037729278610'],
    LIST_OF_ACCOUNTS: ['484752921218'],
  },
  // SUPPORT_ACCOUNT_ID: '037729278610',
  SUPPORT_ACCOUNT_ID: '484752921218',
  SERVICE_ACCOUNTS: [
    // { Name: 'master', Id: '037729278610', Email: 'jingood0728@naver.com' },
    { Name: 'master', Id: '484752921218', Email: 'awstf_rnd@skcc.com' },
    // { Name: 'logging', Id: '318126949465', Email: 'jingood2+logging@gmail.com' },
    // { Name: 'sub2', Id: '856556794427', Email: 'jingood2+sub2@gmail.com' },
  ],
  ALLOWED_REGIONS: ['ap-northeast-2'],
  // REQUESTED_REGIONS: 'ap-northeast-2,us-east-1',
  REQUESTED_REGIONS: 'ap-northeast-2',

  IAM_PERMISSION_BOUNDARY_LIMIT: 'true',

  // FIFTEEN_MINUTES | ONE_HOUR | SIX_HOURS
  GUARD_DUTY_PUBLISH_FREQUENCY: 'SIX_HOURS',
};

export function validateEnvVariables() {
  for (let variable in envVars) {
    if (!envVars[variable as keyof typeof envVars]) {
      throw Error(
        chalk.red(`[app]: Environment variable ${variable} is not defined!`),
      );
    }
  }
}

export function convertYamlString(filename: string) : string {
  var nativeObject = YAML.load(filename);

  return YAML.stringify(nativeObject, 2);

}
export function yamlToJson(yamlfile: string) : string {
  var nativeObject = YAML.load(yamlfile);

  return JSON.stringify(nativeObject);
}