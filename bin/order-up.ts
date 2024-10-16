#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DatabaseStack } from '../lib/database/database';
import { LambdaStack } from '../lib/lambda/lambda';
import { APIStack } from '../lib/api-gateway/api';

const app = new cdk.App();

const orderUpDBStack = new DatabaseStack(app, 'OrderUpDBStack', {
  tableName: 'OrderUpDB'
});

const orderUpLambdaStack = new LambdaStack(app, 'OrderUpLambdaStack', orderUpDBStack.table, { });

const orderUpAPIStack = new APIStack(app, 'OrderUpAPIStack', orderUpLambdaStack.ordersFunction, { });