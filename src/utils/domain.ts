let domain: string;

switch (process.env.VERCEL_ENV) {
  case "production":
    domain = "ency.live";
    break;

  case "development":
    domain = "dev.ency.live";
    break;

  case "preview":
    domain = process.env.VERCEL_URL || "ency.live";
    break;

  default:
    domain = "ency.live";
    break;
}

export { domain };
