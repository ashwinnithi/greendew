import React, { useState } from "react";
import { useInquiryForm } from "../hooks/useInquiryForm";

/**
 * React Component Blueprint demonstrating the structure of the Inquiry Form.
 * Note: The live site uses the compiled vanilla JS version injected directly.
 */
export const InquiryForm: React.FC = () => {
  const { loading, success, error, submitForm } = useInquiryForm();
  
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    country: "",
    email: "",
    phone: "",
    product: "Moringa Leaf Powder",
    quantity: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const successResult = await submitForm(formData);
    if (successResult) {
      setFormData({
        name: "",
        company: "",
        country: "",
        email: "",
        phone: "",
        product: "Moringa Leaf Powder",
        quantity: "",
        message: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} id="inquiry" className="rounded-md bg-white p-5 shadow-soft sm:p-7">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Name *"
          className="..."
        />
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="..."
        />
        <input
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          placeholder="Country *"
          className="..."
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email *"
          className="..."
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="Phone Number *"
          className="..."
        />
        <select
          name="product"
          value={formData.product}
          onChange={handleChange}
          required
          className="..."
        >
          <option>Moringa Leaf Powder</option>
          <option>Moringa Tea Leaves</option>
          <option>Moringa Seeds</option>
          <option>Moringa Oil</option>
          <option>Herbal Products</option>
          <option>Spices</option>
          <option>Agricultural Products</option>
        </select>
        <input
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity Required"
          className="..."
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Message *"
          className="..."
        />
      </div>

      {error && (
        <div role="alert" aria-live="assertive" className="mt-4 text-sm text-red-500 font-semibold">
          {error}
        </div>
      )}

      {success && (
        <div role="alert" aria-live="assertive" className="mt-4 text-sm text-green-500 font-semibold">
          Thank you for contacting us. Our sales team will reach out shortly.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-leaf px-6 py-4 text-sm font-semibold text-white transition hover:bg-forest hover:text-gold disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {loading ? (
          <>
            <span className="animate-spin mr-2">&#9696;</span>
            Sending...
          </>
        ) : (
          "Send Inquiry"
        )}
      </button>
    </form>
  );
};
