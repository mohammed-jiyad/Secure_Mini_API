
import 'dotenv/config';

export const env = {
  PORT: process.env.PORT || 3000,
  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY || '',
  SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET || '',
  SHOPIFY_SCOPES: process.env.SHOPIFY_SCOPES || 'read_products,write_products',
  SHOPIFY_REDIRECT_URI: process.env.SHOPIFY_REDIRECT_URI || 'http://localhost:3000/api/v1/shopify/auth/callback'
};
