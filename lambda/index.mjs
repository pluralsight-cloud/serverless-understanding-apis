import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);

const tableName = process.env.TABLE_NAME;

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      case "DELETE /orders/{id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = `Deleted order ${event.pathParameters.id}`;
        break;
      case "GET /orders/{id}":
        body = await dynamo.send(
          new GetCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = body.Item;
        break;
      case "GET /orders":
        body = await dynamo.send(
          new ScanCommand({ TableName: tableName })
        );
        body = body.Items;
        break;
      case "PUT /orders":
        let requestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: tableName,
            Item: {
              id: requestJSON.id,
              pie: requestJSON.pie,
              quantity: requestJSON.quantity,
              customerName: requestJSON.customerName,
              deliveryDate: requestJSON.deliveryDate,
            },
          })
        );
        body = `Received order ${requestJSON.id}`;
        break;
        case "POST /orders":
          let postRequestJSON = JSON.parse(event.body);
          await dynamo.send(
            new PutCommand({
              TableName: tableName,
              Item: {
                id: postRequestJSON.id,
                pie: postRequestJSON.pie,
                quantity: postRequestJSON.quantity,
                customerName: postRequestJSON.customerName,
                deliveryDate: postRequestJSON.deliveryDate,
              },
            })
          );
          body = `Created new order with ID ${postRequestJSON.id}`;
          break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
