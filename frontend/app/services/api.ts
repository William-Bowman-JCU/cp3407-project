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

// ── Restaurants & Menu ──────────────────────────────────────────────────────

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  is_available: boolean;
};

export type RestaurantDetail = {
  id: number;
  name: string;
  cuisine_type: string;
  address: string;
  rating: number;
  image_url: string;
  opening_time: string;
  closing_time: string;
  is_active: boolean;
  menu_items: MenuItem[];
};

export function getRestaurantDetail(id: number): Promise<RestaurantDetail> {
  return apiFetch(`/restaurants/${id}/`, { method: "GET" });
}

// ── Orders ──────────────────────────────────────────────────────────────────

export type OrderItem = {
  id: number;
  menu_item: { name: string; price: string };
  quantity: number;
  unit_price: string;
  line_total: string;
};

export type Order = {
  id: number;
  restaurant: number;
  status: string;
  delivery_fee: string;
  placed_at: string;
  estimated_delivery: string | null;
  items: OrderItem[];
  subtotal: string;
  total: string;
};

export function getOrders(): Promise<Order[]> {
  return apiFetch("/orders/", { method: "GET" });
}

// ── Account Settings ────────────────────────────────────────────────────────

export type AccountProfile = {
  name: string;
  email: string;
};

export type AccountUpdatePayload = {
  email: string;         // current email — used to identify the user
  name?: string;
  new_email?: string;
  new_password?: string;
};

export function getAccount(email: string): Promise<AccountProfile> {
  return apiFetch(`/account/?email=${encodeURIComponent(email)}`, {
    method: "GET",
  });
}

export function updateAccount(
  payload: AccountUpdatePayload
): Promise<{ message: string; user: AccountProfile }> {
  return apiFetch("/account/", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
