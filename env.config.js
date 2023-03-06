/* eslint-disable no-process-env */
/**
 *
 * @param str {string}
 * @returns {string}
 */

const envConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  nodeEnv: process.env.NEXT_PUBLIC_NODE_ENV || 'production',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  stripeKey: process.env.NEXT_PUBLIC_STRIPE_KEY || ' ',
  bugherdKey: process.env.NEXT_PUBLIC_STRIPE_KEY,
  fbAppId: process.env.NEXT_PUBLIC_FB_APP_ID || ' ',
  googleAppId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID || ' ',
};

const requiredEnvConfig = {
  apiUrl: true,
  fbAppId: true,
  googleAppId: true,
};

module.exports = {
  envConfig,
  requiredEnvConfig,
};
