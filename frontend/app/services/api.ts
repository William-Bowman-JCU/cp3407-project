const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export type AddressPayload = {
  street: string;
  city: string;
  postal_code: string;
};

export type OrderPayload = {
  restaurant: number;
  delivery_address: number;
  delivery_fee?: number;
};

export type CreatedOrder = {
  id: number;
  status: string;
  total: string;
};

async function apiFetch<T>(path: string, options: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, text);
  }

  return res.json() as Promise<T>;
}

export function createAddress(
  payload: AddressPayload
): Promise<{ id: number }> {
  return apiFetch("/addresses/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createOrder(payload: OrderPayload): Promise<CreatedOrder> {
  return apiFetch("/orders/create/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
