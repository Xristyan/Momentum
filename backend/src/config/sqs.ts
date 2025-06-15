import { SQSClient } from "@aws-sdk/client-sqs";

const sqsClient = new SQSClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  region: `${process.env.AWS_REGION}`,
  apiVersion: "2012-11-05",
});

const queueUrl = `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_CUSTOMER_ID}/${process.env.AWS_QUEUE}`;

export { sqsClient, queueUrl };
