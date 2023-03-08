import * as cdk from 'aws-cdk-lib';
import { SecretValue } from 'aws-cdk-lib';
import * as codecommit from 'aws-cdk-lib/aws-codecommit';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { Construct } from 'constructs';
import { ServiceAccountNetworkStage } from './cdk-pipeline-stages/service-account-network-stage';
import { envVars } from './config';
import { LoggingAccountStage } from './logging-account-stage';
import { MasterAccountStage } from './master-account-stage';
//import { ServiceAccountStage } from './service-account-stage';
import { StacksetStage } from './stackset-stage';
//import { DynamoDbCustomLoaderStack } from './infra/ddb-custom-loader-stack';

export interface CodepipelineSourceProps {
  gitType: string;
  branch: string;
  repoString: string;
  githubToken?: string;
}

export interface CdkPipelinesProps extends cdk.StackProps {
}

export class CdkPipelinesStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: CdkPipelinesProps) {
    super(scope, id, props);


    const pipeline = new CodePipeline(this, 'Pipeline', {
      selfMutation: true,
      pipelineName: `${envVars.COMPANY_NAME}-${envVars.PROJECT_NAME}-pipeline`,
      crossAccountKeys: true,
      synth: new ShellStep('Synth', {
        input: this.getCodepipelineSource(),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });


    // ToDo: Add ApplicationStage
    //pipeline.addStage(new MyStack(this, 'Dev'));
    pipeline.addStage(new MasterAccountStage(this, 'LZ-CORE-MASTER', {
      env: {
        account: envVars.MASTER.ACCOUNT_ID,
        region: envVars.REGION,
      },
    }));

    pipeline.addStage(new LoggingAccountStage(this, 'LZ-CORE-LOGARCHIVE', {
      env: {
        account: envVars.LOG_ARCHIVE.ACCOUNT_ID,
        region: envVars.REGION,
      },
    }));

    /* pipeline.addStage(new ServiceAccountStage(this, 'LZ-SVC', {
      env: {
        account: '037729278610',
        region: 'ap-northeast-2',
      },
    }));

    pipeline.addStage(new ServiceAccountStage(this, 'LZ-SUB2', {
      env: {
        account: '856556794427',
        region: 'ap-northeast-2',
      },
    })); */


    pipeline.addStage(new StacksetStage(this, 'LZ-SERVICE-ACCOUNTS', {
      env: {
        account: envVars.MASTER.ACCOUNT_ID,
        region: envVars.REGION,
      },
    }));

    // TEST Code
    // for (let account of envVars.SERVICE_ACCOUNTS) {
    //   pipeline.addStage(new ServiceAccountNetworkStage(this, `LZ-SERVICE-ACCOUNTS-${account.Id}`, {
    //     env: {
    //       account: account.Id,
    //       region: envVars.REGION,
    //     },
    //   }));
    // }

    // let svc2 = envVars.SERVICE_ACCOUNTS[3].Id;
    // let svc2 = envVars.LOG_ARCHIVE.ACCOUNT_ID;

    // pipeline.addStage(new ServiceAccountNetworkStage(this, `LZ-SERVICE-ACCOUNTS-${svc2}`, {
    //   env: {
    //     account: svc2,
    //     region: envVars.REGION,
    //   },
    // }));



  }

  // private getCodepipelineSource( sourceProps: CodepipelineSourceProps) : CodePipelineSource | undefined {
  private getCodepipelineSource() : CodePipelineSource | undefined {

    let gitProvider = new cdk.CfnParameter(this, 'git-provider', {
      type: 'String',
      description: 'name of git provider',
      default: 'GITHUB',
      allowedValues: ['GITHUB', 'CODECOMMIT'],
    }).valueAsString;

    gitProvider = envVars.SOURCE_PROVIDER;

    // 👇 parameter of type String
    let repoName = new cdk.CfnParameter(this, 'repository', {
      type: 'String',
      description: 'repository name of cdk infra',
      default: 'jingood2/custom-resource-ddb-example',
    }).valueAsString;

    repoName = envVars.REPO;

    let branchName = new cdk.CfnParameter(this, 'branch', {
      type: 'String',
      description: 'branch name of git repository',
      default: 'main',
    }).valueAsString;

    branchName = envVars.BRANCH;

    new cdk.CfnCondition(this, 'UseGithub', {
      expression: cdk.Fn.conditionEquals(gitProvider, 'github'),
    });

    const pipelinesProps: CodepipelineSourceProps = {
      gitType: gitProvider,
      repoString: repoName,
      branch: branchName,
      githubToken: '',
    };

    switch (pipelinesProps.gitType) {

      case 'GITHUB':
        // let githubToken = new cdk.CfnParameter(this, 'githubToken', {
        //   type: 'String',
        //   description: 'secret key for github personal access token',
        //   default: '',
        // }).valueAsString;
        pipelinesProps.githubToken = envVars.GITHUB_TOKEN;

        return CodePipelineSource.gitHub(pipelinesProps.repoString, pipelinesProps.branch, {
          authentication: SecretValue.secretsManager(pipelinesProps.githubToken ?? ''),
        });
      case 'CODECOMMIT':
        return CodePipelineSource.codeCommit(
          codecommit.Repository.fromRepositoryName(this, 'Repository', pipelinesProps.repoString), pipelinesProps.branch);

      default :
        return undefined;

    }
  }
}

/* class MyApplication extends cdk.Stage {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    new DynamoDbCustomLoaderStack(this, 'Database', { });
  }
 }
 */