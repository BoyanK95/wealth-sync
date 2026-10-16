import createNextIntlPlugin from "next-intl/plugin";
import { env } from "./src/env.js";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const withNextIntl = createNextIntlPlugin();

const s3ObjectPattern =
  env.AWS_ENDPOINT_URL_S3 && env.AWS_S3_BUCKET_NAME
    ? (() => {
        const url = new URL(env.AWS_ENDPOINT_URL_S3);
        /** @type {"http" | "https" | null} */
        const protocol =
          url.protocol === "http:"
            ? "http"
            : url.protocol === "https:"
              ? "https"
              : null;

        if (!protocol) {
          throw new Error("AWS_ENDPOINT_URL_S3 must use HTTP or HTTPS");
        }

        return {
          protocol,
          hostname: url.hostname,
          pathname: `${url.pathname.replace(/\/$/, "")}/${env.AWS_S3_BUCKET_NAME}/**`,
        };
      })()
    : null;

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "platform-lookaside.fbsbx.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "static2.finnhub.io",
        pathname: "**",
      },
      ...(s3ObjectPattern ? [s3ObjectPattern] : []),
    ],
  },
};

export default withNextIntl(config);
