

## 1.cdk-assume-role-credential-plugin 작업
#export AWS_PROFILE=logging-administrator
# npx cdk bootstrap \ 
# --profile logging-administrator \ 
# --trust 037729278610 \ 
# --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \ 
# aws://318126949465/ap-northeast-2

# aws-tf-cdklz-log
npx cdk bootstrap \ 
--profile aws-tf-cdklz-log \ 
--trust 293431643333 \ 
--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \ 
aws://303182103652/ap-northeast-2

npx cdk bootstrap --profile aws-tf-cdklz-log --trust 293431643333 --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws://303182103652/ap-northeast-2

# aws-tf-cdklz-svc
npx cdk bootstrap \ 
--profile aws-tf-cdklz-svc \ 
--trust 293431643333 \ 
--cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \ 
aws://424265176155/ap-northeast-2

npx cdk bootstrap --profile aws-tf-cdklz-svc --trust 293431643333 --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws://424265176155/ap-northeast-2

## 2. 
## 2. environment variable 에 계정 정보 추가

## 3. 

