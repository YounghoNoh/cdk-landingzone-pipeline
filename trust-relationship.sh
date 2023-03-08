
## 1.cdk-assume-role-credential-plugin 작업

#export AWS_PROFILE=logging-administrator
# npx cdk bootstrap \ 
# --profile logging-administrator \ 
# --trust 037729278610 \ 
# --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \ 
# aws://318126949465/ap-northeast-2

# aws-tf-cdklz
npx cdk bootstrap \
--profile aws-tf-cdklz \
--no-bootstrap-customer-key \
--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
aws://293431643333/ap-northeast-2

# aws-tf-cdklz-log
# --trust 293431643333 \
# --trust-for-lookup 293431643333 \
npx cdk bootstrap \
--profile aws-tf-cdklz-log \
--trust 293431643333 \
--no-bootstrap-customer-key \
--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
aws://303182103652/ap-northeast-2

# aws-tf-cdklz-svc
npx cdk bootstrap \
--profile aws-tf-cdklz-svc \
--trust 293431643333 \
--no-bootstrap-customer-key \
--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
aws://424265176155/ap-northeast-2

# aws-tf-cdklz-svc2
npx cdk bootstrap \
--profile aws-tf-cdklz-svc2 \
--trust 293431643333 \
--no-bootstrap-customer-key \
--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
aws://907555560021/ap-northeast-2

aws s3 mb s3://cdklz-stackset-template-293431643333 \
    --profile aws-tf-cdklz \
    --region ap-northeast-2

aws s3 cp ./src/cfn-template/cdklz-stackset-template \
    s3://cdklz-stackset-template-293431643333/ \
    --profile aws-tf-cdklz \
    --recursive

aws codecommit create-repository \
    --profile aws-tf-cdklz \
    --repository-name cdk-landingzone-pipeline2 \
    --region ap-northeast-2


AWS_SDK_LOAD_CONFIG=1 AWS_PROFILE=aws-tf-cdklz npx awscdk-v1-stack-finder

assumed-role/acme-landingZone-Pipeline-PipelineBuildSynthCdkBui-734YV83E1RW1/AWSCodeBuild-e370d960-9ea1-4723-85be-65e890b066be