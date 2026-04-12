"use client";

import { useState } from "react";

export type PaymentFormData = {
  street: string;
  city: string;
  postalCode: string;
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

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

export default function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    street: "",
    city: "",
    postalCode: "",
    cardName: "",
    cardNumber: "",
    month: "",
    year: "",
    notifications: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PaymentFormData, string>>>({});

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

  function validate(): boolean {
    const newErrors: Partial<Record<keyof PaymentFormData, string>> = {};

    if (!formData.street.trim()) {
      newErrors.street = "Street address is required.";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    }

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
    const currentYear = new Date().getFullYear() % 100;
    if (!formData.year || isNaN(yearNum) || yearNum < currentYear) {
      newErrors.year = "Enter a valid future year (2-digit).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  }

  const inputClass =
    "w-full bg-zinc-600 text-white placeholder-zinc-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition";

  const errorClass = "text-red-400 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4">
          Delivery Address
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">Street</label>
            <input
              type="text"
              name="street"
              placeholder="123 Main St"
              value={formData.street}
              onChange={handleChange}
              className={inputClass}
              autoComplete="street-address"
            />
            {errors.street && <p className={errorClass}>{errors.street}</p>}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-zinc-300 text-sm mb-1 block">City</label>
              <input
                type="text"
                name="city"
                placeholder="Townsville"
                value={formData.city}
                onChange={handleChange}
                className={inputClass}
                autoComplete="address-level2"
              />
              {errors.city && <p className={errorClass}>{errors.city}</p>}
            </div>
            <div className="w-32">
              <label className="text-zinc-300 text-sm mb-1 block">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                placeholder="4810"
                value={formData.postalCode}
                onChange={handleChange}
                maxLength={10}
                className={inputClass}
                autoComplete="postal-code"
                inputMode="numeric"
              />
              {errors.postalCode && (
                <p className={errorClass}>{errors.postalCode}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-600" />

      <div>
        <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4">
          Payment Details
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-zinc-300 text-sm mb-1 block">Card Name</label>
            <input
              type="text"
              name="cardName"
              placeholder="Leonard Rein"
              value={formData.cardName}
              onChange={handleChange}
              className={inputClass}
              autoComplete="cc-name"
            />
            {errors.cardName && <p className={errorClass}>{errors.cardName}</p>}
          </div>

          <div>
            <label className="text-zinc-300 text-sm mb-1 block">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
              className={inputClass}
              autoComplete="cc-number"
              inputMode="numeric"
            />
            {errors.cardNumber && (
              <p className={errorClass}>{errors.cardNumber}</p>
            )}
          </div>

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
        </div>
      </div>

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
