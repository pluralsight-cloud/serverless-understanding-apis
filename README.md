# Understanding Serverless APIs Sample API

To deploy this sample API, Node.js, the AWS CLI, and the AWS CDK need to be installed.  Install Node in your preferred manner, then install the CDK via Node:

```
npm install -g aws-cdk
```

Install the CLI based on instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

Configure the CLI to work with your AWS account. If you have Cloud Playground access, spin up a Playground and use the access key provided:

```
aws configure
```

Bootstrap the CDK environment:

```
cdk bootstrap
```

Install any project dependencies:

```
npm install
```

Deploy the API:

```
cdk deploy --all
```

To use the API, retrieve the output API URL and open `demo-data.txt` for example API calls. Replace the `<API_URL>` with the API URL output by the CDK. Use your terminal to send the calls!

When done, destroy the API (or if you're on the Cloud Playground, just delete the playground, I won't judge):

```
cdk destroy --all
```
