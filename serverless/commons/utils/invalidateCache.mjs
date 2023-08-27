import {
  APIGatewayClient,
  FlushStageCacheCommand,
} from "@aws-sdk/client-api-gateway";
import Logger from "./logger.mjs";

const $logger = new Logger("function:utils:invalidateCache");

export async function invalidateAPIGatewayCache() {
  try {
    const client = new APIGatewayClient({ region: process.env.AWS_REGION });

    const params = {
      restApiId: process.env.API_GATEWAY_ID,
      stageName: process.env.STAGE,
    };
    const command = new FlushStageCacheCommand(params);
    await client.send(command);
  } catch (error) {
    $logger.error("ERROR_ON_INVALIDATE_CACHE", error);
  }
}
