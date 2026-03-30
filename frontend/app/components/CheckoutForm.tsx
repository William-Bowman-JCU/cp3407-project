/**
 * CheckoutForm Component
 *
 * Handles payment input fields:
 * - Card holder name
 * - Card number (formatted as XXXX XXXX XXXX XXXX)
 * - Expiry month + year
 * - Notifications checkbox
 *
 * Validates input before calling onSubmit.
 */

"use client";

import { useState } from "react";

// --- Type Definitions ---

export type PaymentFormData = {
  cardName: string;
  cardNumber: string;
  month: string;
  year: string;
  notifications: boolean;
};

type CheckoutFormProps = {
  onSubmit: (data: PaymentFormData) => void;
  isLoading: boolean;
};

// --- Helper: Format card number with spaces every 4 digits ---
function formatCardNumber(value: string): string {
  // Remove non-digits, then insert a space every 4 chars
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

// --- Component ---

export default function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  // Form state
  const [formData, setFormData] = useState<PaymentFormData>({
    cardName: "",
    cardNumber: "",
    month: "",
    year: "",
    notifications: false,
  });

  // Validation error messages
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  // --- Handlers ---

  function handleCardNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // --- Validation ---

  function validate(): boolean {
    const newErrors: Partial<PaymentFormData> = {};

    if (!formData.cardName.trim()) {
      newErrors.cardName = "Card name is required.";
    }

    const digitsOnly = formData.cardNumber.replace(/\s/g, "");
    if (digitsOnly.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    const monthNum = parseInt(formData.month, 10);
    if (!formData.month || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
      newErrors.month = "Enter a valid month (01–12).";
    }

    const yearNum = parseInt(formData.year, 10);
    const currentYear = new Date().getFullYear() % 100; // e.g. 26 for 2026
    if (!formData.year || isNaN(yearNum) || yearNum < currentYear) {
      newErrors.year = "Enter a valid future year (2-digit).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // --- Submit Handler ---

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  }

  // --- Shared input style ---
  const inputClass =
    "w-full bg-zinc-600 text-white placeholder-zinc-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition";

  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

      {/* Card Holder Name */}
      <div>
        <label className="text-zinc-300 text-sm mb-1 block">Card Name</label>
        <input
          type="text"
          name="cardName"
          placeholder="John Doe"
          value={formData.cardName}
          onChange={handleChange}
          className={inputClass}
          autoComplete="cc-name"
        />
        {errors.cardName && <p className={errorClass}>{errors.cardName}</p>}
      </div>

      {/* Card Number */}
      <div>
        <label className="text-zinc-300 text-sm mb-1 block">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={handleCardNumberChange}
          maxLength={19} // 16 digits + 3 spaces
          className={inputClass}
          autoComplete="cc-number"
          inputMode="numeric"
        />
        {errors.cardNumber && <p className={errorClass}>{errors.cardNumber}</p>}
      </div>

      {/* Month + Year side by side */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-zinc-300 text-sm mb-1 block">Month</label>
          <input
            type="text"
            name="month"
            placeholder="MM"
            value={formData.month}
            onChange={handleChange}
            maxLength={2}
            className={inputClass}
            autoComplete="cc-exp-month"
            inputMode="numeric"
          />
          {errors.month && <p className={errorClass}>{errors.month}</p>}
        </div>
        <div className="flex-1">
          <label className="text-zinc-300 text-sm mb-1 block">Year</label>
          <input
            type="text"
            name="year"
            placeholder="YY"
            value={formData.year}
            onChange={handleChange}
            maxLength={2}
            className={inputClass}
            autoComplete="cc-exp-year"
            inputMode="numeric"
          />
          {errors.year && <p className={errorClass}>{errors.year}</p>}
        </div>
      </div>

      {/* Notifications Checkbox */}
      <label className="flex items-center gap-3 cursor-pointer text-zinc-300 text-sm">
        <input
          type="checkbox"
          name="notifications"
          checked={formData.notifications}
          onChange={handleChange}
          className="w-4 h-4 accent-red-500"
        />
        Do you like to receive notifications and updates?
      </label>

      {/* PAY Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-500 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl text-base tracking-widest uppercase transition-colors"
      >
        {isLoading ? "Processing..." : "PAY"}
      </button>
    </form>
  );
}
