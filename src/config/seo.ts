export const getURL = (): string => {
  const url =
    process?.env?.URL && process.env.URL !== ""
      ? process.env.URL
      : process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ""
      ? process.env.VERCEL_URL
      : "http://localhost:3000";
  return url.includes("http") ? url : `https://${url}`;
};

const DEFAULT_TITLE = "Home";
const DEFAULT_TITLE_TEMPLATE = "%s | Ency";
const DEFAULT_DESCRIPTION = "Get your Paper Done Without the Pain!";
const DEFAULT_CANONICAL = getURL();
const SITE_NAME = "Ency";
const DEFAULT_OG_IMAGE = `${DEFAULT_CANONICAL}/images/preview.png`;
const TWITTER_HANDLE = "";
const TWITTER_CARD_TYPE = "summary_large_image";
const FAVICON_LINK = "/images/favicon.png";

export const SEO = {
  DEFAULT_TITLE,
  DEFAULT_TITLE_TEMPLATE,
  DEFAULT_DESCRIPTION,
  DEFAULT_CANONICAL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  TWITTER_CARD_TYPE,
  FAVICON_LINK,
};
