import { GOOGLE_SCRIPT_ENDPOINT } from "../config";

export interface InquiryData {
  name: string;
  company: string;
  country: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  message: string;
}

/**
 * Sends form inquiry data to the Google Apps Script Web App.
 * Uses POST method with standard application/json content type.
 */
export async function sendInquiry(data: InquiryData): Promise<Response> {
  if (!GOOGLE_SCRIPT_ENDPOINT) {
    throw new Error("Google Apps Script Endpoint is not configured.");
  }
  
  return fetch(GOOGLE_SCRIPT_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify(data)
  });
}
