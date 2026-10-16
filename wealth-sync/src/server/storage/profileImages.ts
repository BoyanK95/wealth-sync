import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
import { env } from "@/env";

const profileImagePrefix = "neon-s3://";
const profileImageMimeTypes = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
} as const;

function getS3Config() {
  const {
    AWS_ENDPOINT_URL_S3,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    AWS_S3_BUCKET_NAME,
  } = env;

  if (
    !AWS_ENDPOINT_URL_S3 ||
    !AWS_ACCESS_KEY_ID ||
    !AWS_SECRET_ACCESS_KEY ||
    !AWS_REGION ||
    !AWS_S3_BUCKET_NAME
  ) {
    throw new Error("Neon S3 storage is not fully configured");
  }

  return {
    bucket: AWS_S3_BUCKET_NAME,
    client: new S3Client({
      endpoint: AWS_ENDPOINT_URL_S3,
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    }),
  };
}

export async function uploadProfileImage(userId: string, dataUrl: string) {
  const match = /^data:(image\/(?:jpeg|png|webp|gif));base64,([\s\S]+)$/.exec(
    dataUrl,
  );
  if (!match) throw new Error("Unsupported profile image format");

  const contentType = match[1] as keyof typeof profileImageMimeTypes;
  const body = Buffer.from(match[2], "base64");
  if (!body.length || body.length > 5 * 1024 * 1024) {
    throw new Error("Profile image must be smaller than 5 MB");
  }

  const key = `profile-images/${userId}/${randomUUID()}.${profileImageMimeTypes[contentType]}`;
  const { client, bucket } = getS3Config();
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
      CacheControl: "private, max-age=31536000, immutable",
    }),
  );

  return {
    imageRef: `${profileImagePrefix}${key}`,
    imageUrl: await signProfileImage(key),
  };
}

export async function resolveProfileImage(image: string | null) {
  if (!image?.startsWith(profileImagePrefix)) return image;
  return signProfileImage(image.slice(profileImagePrefix.length));
}

async function signProfileImage(key: string) {
  const { client, bucket } = getS3Config();
  return getSignedUrl(
    client,
    new GetObjectCommand({ Bucket: bucket, Key: key }),
    { expiresIn: 60 * 60 },
  );
}
