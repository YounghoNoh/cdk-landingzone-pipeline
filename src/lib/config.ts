import * as chalk from 'chalk';
import * as YAML from 'yamljs';

export const envVars = {
  REGION: process.env.REGION || 'ap-northeast-2',
  COMPANY_NAME: 'acme',
  PROJECT_NAME: 'landingZone',
  /*  GITHUB
      CODECOMMIT
  */
  SOURCE_PROVIDER: 'CODECOMMIT',
  REPO: process.env.REPO_NAME || 'cdk-landingzone-pipeline',
  BRANCH: 'awstf-rnd-v2',
  // GITHUB 사용시 입력 AWS Secrets Manager에 등록된 git token key값 입력
  GITHUB_TOKEN: 'skip',
  MASTER: {
    ACCOUNT_ID: '293431643333',
    REQUIRE_MFA_ON_MAIN_ACCOUNT_ACTION: 'true',
  },
  LOG_ARCHIVE: {
    ACCOUNT_ID: '303182103652',
    BUCKET_PREFIX: 'acme-audit',
    /*  One_Hour
        Three_Hours
        Six_Hours
        Twelve_Hours
        TwentyFour_Hours
    */
    DELIVERY_FREQUENCY: 'Twelve_Hours',
  },
  SUPPORT_ACCOUNT_ID: '293431643333',
  SERVICE_ACCOUNTS: [
    { Name: 'master', Id: '293431643333', Email: 'awstfasset+cdklz@gmail.com' },
    { Name: 'logging', Id: '303182103652', Email: 'awstfasset+cdklz+log@gmail.com' },
    { Name: 'service1', Id: '424265176155', Email: 'awstfasset+cdklz+svc@gmail.com' },
    { Name: 'service2', Id: '907555560021', Email: 'awstfasset+cdklz+svc2@gmail.com' },
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