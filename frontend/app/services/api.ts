const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export class ApiError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export type AddressPayload = {
  street: string;
  city: string;
  suburb?: string;
  postcode?: string;
  is_default?: boolean;
};

export type SavedAddress = {
  id: number;
  street: string;
  city: string;
  suburb?: string;
  postcode: string;
  is_default: boolean;
};

export function getAddresses(): Promise<SavedAddress[]> {
  return authFetch("/addresses/", { method: "GET" });
}

export function deleteAddress(id: number): Promise<void> {
  return authFetch(`/addresses/${id}/`, { method: "DELETE" });
}

export function setDefaultAddress(id: number, current: SavedAddress): Promise<SavedAddress> {
  return authFetch(`/addresses/${id}/`, {
    method: "PUT",
    body: JSON.stringify({ ...current, is_default: true }),
  });
}

export type OrderItemPayload = {
  menu_item: number;
  quantity: number;
  unit_price: number;
};

export type OrderPayload = {
  id?: number;
  restaurant: number;
  delivery_address: number;
  delivery_fee?: number;
  items: OrderItemPayload[];
};

export type CreatedOrder = {
  id: number;
  status: string;
  total: string;
};

async function authFetch<T>(path: string, options: RequestInit): Promise<T> {
  const csrfToken = getCookie("csrftoken");
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken || "",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    console.error(`API error ${res.status}: ${text}`);
    throw new ApiError(res.status, text);
  }

  return res.json() as Promise<T>;
}

async function publicFetch<T>(path: string, options: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
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
  return authFetch("/addresses/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ── Cuisines, Restaurants & Menu ──────────────────────────────────────────────────────

export type Cuisine = {
  id: number;
  name: string;
  image_url: string;
};

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
  address: string;
  rating: number;
  image_url: string;
  opening_time: string;
  closing_time: string;
  is_active: boolean;
  cuisine: string[];
  menu_items: MenuItem[];
};

export function getCuisines(): Promise<Cuisine[]> {
  return publicFetch(`/cuisines/`, { method: "GET" })
}

export function getRestaurants(cuisine?: string): Promise<RestaurantDetail[]> {
  const params = new URLSearchParams()
  if (cuisine) params.set('cuisine', cuisine)

  return publicFetch(`/restaurants/?${params}`, { method: "GET" });
}

export function getRestaurantDetail(id: number): Promise<RestaurantDetail> {
  return publicFetch(`/restaurants/${id}/`, { method: "GET" });
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
  return authFetch("/orders/", { method: "GET" });
}

export function createOrder(payload: OrderPayload): Promise<CreatedOrder> {
  return authFetch("/orders/create/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
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
  return authFetch(`/account/?email=${encodeURIComponent(email)}`, {
    method: "GET",
  });
}

export function updateAccount(
  payload: AccountUpdatePayload
): Promise<{ message: string; user: AccountProfile }> {
  return authFetch("/account/", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
