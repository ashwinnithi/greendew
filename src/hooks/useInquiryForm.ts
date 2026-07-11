import { useState } from "react";
import { sendInquiry, InquiryData } from "../services/googleAppsScript";
import { validateEmail, validatePhone, isEmpty } from "../utils/formService";

export interface UseInquiryFormReturn {
  loading: boolean;
  success: boolean | null;
  error: string | null;
  submitForm: (data: InquiryData) => Promise<boolean>;
  resetState: () => void;
}

/**
 * Reusable React Hook for handling form loading, success, error,
 * and submission logic dynamically.
 */
export function useInquiryForm(): UseInquiryFormReturn {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetState = () => {
    setLoading(false);
    setSuccess(null);
    setError(null);
  };

  const submitForm = async (data: InquiryData): Promise<boolean> => {
    // 1. Prevent duplicate submissions
    if (loading) return false;

    // 2. Validate fields
    if (isEmpty(data.name)) {
      setError("Name is required.");
      return false;
    }
    if (!validateEmail(data.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!validatePhone(data.phone)) {
      setError("Please enter a valid phone number.");
      return false;
    }
    if (isEmpty(data.product)) {
      setError("Product is required.");
      return false;
    }
    if (isEmpty(data.message)) {
      setError("Message is required.");
      return false;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await sendInquiry({
        name: data.name.trim(),
        company: data.company.trim(),
        country: data.country.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        product: data.product.trim(),
        quantity: data.quantity.trim(),
        message: data.message.trim(),
      });

      // Google Apps Script redirects might result in redirect/opaque responses depending on cors mode.
      // Opaque response is type "opaque" and status 0. If it completed, we count it as success.
      if (response.ok || response.type === "opaque" || response.status === 200) {
        setSuccess(true);
        setLoading(false);
        return true;
      } else {
        throw new Error(`HTTP Error Status: ${response.status}`);
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
      setSuccess(false);
      setLoading(false);
      return false;
    }
  };

  return {
    loading,
    success,
    error,
    submitForm,
    resetState,
  };
}
