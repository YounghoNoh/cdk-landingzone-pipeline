# replace this

# package-lock.json Install dependencies 
``` shell
npm ci
```

# CDK Pipeline
https://aws.amazon.com/ko/blogs/developer/cdk-pipelines-continuous-delivery-for-aws-cdk-applications/

# git token 생성
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

# git token AWS Secrets Manager 등록

# config 수정
path : src/lib/config.ts

# cdk deploy
``` shell
npx cdk deploy --profile <profile-name>
```

# cdk destory
``` shell
npx cdk destroy --profile <profile-name>
```