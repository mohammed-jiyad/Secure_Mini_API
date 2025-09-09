
import axios from "axios";
import { env } from "../config/config";

export async function exchangeAccessToken(code: string, shop: string): Promise<string> {
  const url = `https://${shop}/admin/oauth/access_token`;

  const response = await axios.post(url, {
    client_id: env.SHOPIFY_API_KEY,
    client_secret: env.SHOPIFY_API_SECRET,
    code,
    redirect_uri: env.SHOPIFY_REDIRECT_URI, 
  });

  return response.data.access_token;
}
