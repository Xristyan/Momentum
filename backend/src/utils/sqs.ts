import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient, queueUrl } from "../config/sqs";
import logger from "../config/logger";
import { CustomError } from "../errors/error";

export async function sendMessage(body: unknown) {
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(body),
  });

  try {
    const response = await sqsClient.send(command);
    logger.info(">>> sendMessage RESPONSE>>>", response);
  } catch (error) {
    logger.error(">>> sendMessage ERROR>>>", error);
    throw new CustomError("Error sending message to SQS", 500);
  }
}
