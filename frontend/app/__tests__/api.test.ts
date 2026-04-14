/**
 * Unit tests for the API service layer (services/api.ts)
 * Verifies that API functions construct correct URLs and handle
 * responses properly without requiring a live backend.
 */

import {
  getRestaurantDetail,
  getOrders,
  getAddresses,
  getAccount,
  ApiError,
} from "../services/api";

// Mock global fetch before each test
const mockFetch = jest.fn();
global.fetch = mockFetch;

function mockOkResponse(data: unknown) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  });
}

function mockErrorResponse(status: number) {
  mockFetch.mockResolvedValueOnce({
    ok: false,
    status,
    text: async () => "Error",
    statusText: "Error",
  });
}

beforeEach(() => {
  mockFetch.mockClear();
});

// ---------------------------------------------------------------------------
// Restaurant endpoints
// ---------------------------------------------------------------------------

describe("getRestaurantDetail", () => {
  it("calls the correct URL for a given restaurant id", async () => {
    mockOkResponse({ id: 5, name: "Sushi Bar", menu_items: [] });
    await getRestaurantDetail(5);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/restaurants/5/"),
      expect.any(Object)
    );
  });

  it("returns restaurant data including menu_items", async () => {
    const mockData = {
      id: 5,
      name: "Sushi Bar",
      cuisine_type: "Japanese",
      menu_items: [{ id: 1, name: "Salmon Roll", price: "14.00", category: "Rolls" }],
    };
    mockOkResponse(mockData);
    const result = await getRestaurantDetail(5);
    expect(result.name).toBe("Sushi Bar");
    expect(result.menu_items).toHaveLength(1);
  });

  it("throws ApiError when the server returns 404", async () => {
    mockErrorResponse(404);
    await expect(getRestaurantDetail(999)).rejects.toThrow(ApiError);
  });
});

// ---------------------------------------------------------------------------
// Order endpoints
// ---------------------------------------------------------------------------

describe("getOrders", () => {
  it("calls the orders endpoint", async () => {
    mockOkResponse([]);
    await getOrders();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/orders/"),
      expect.any(Object)
    );
  });

  it("returns an array of orders", async () => {
    const mockOrders = [
      { id: 1, status: "delivered", total: "25.99", items: [] },
      { id: 2, status: "pending", total: "14.50", items: [] },
    ];
    mockOkResponse(mockOrders);
    const result = await getOrders();
    expect(result).toHaveLength(2);
    expect(result[0].status).toBe("delivered");
  });

  it("throws ApiError on 401 (unauthenticated)", async () => {
    mockErrorResponse(401);
    await expect(getOrders()).rejects.toThrow(ApiError);
  });
});

// ---------------------------------------------------------------------------
// Address endpoints
// ---------------------------------------------------------------------------

describe("getAddresses", () => {
  it("calls the addresses endpoint", async () => {
    mockOkResponse([]);
    await getAddresses();
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/addresses/"),
      expect.any(Object)
    );
  });

  it("returns saved addresses with is_default flag", async () => {
    mockOkResponse([
      { id: 1, street: "123 Main St", city: "Townsville", is_default: true },
    ]);
    const result = await getAddresses();
    expect(result[0].is_default).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Account endpoints
// ---------------------------------------------------------------------------

describe("getAccount", () => {
  it("calls the account endpoint with email as query param", async () => {
    mockOkResponse({ name: "Leonard", email: "leonard@example.com" });
    await getAccount("leonard@example.com");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/account/"),
      expect.any(Object)
    );
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("leonard%40example.com"),
      expect.any(Object)
    );
  });

  it("returns account profile with name and email", async () => {
    mockOkResponse({ name: "Leonard", email: "leonard@example.com" });
    const result = await getAccount("leonard@example.com");
    expect(result.name).toBe("Leonard");
    expect(result.email).toBe("leonard@example.com");
  });
});

// ---------------------------------------------------------------------------
// ApiError class
// ---------------------------------------------------------------------------

describe("ApiError", () => {
  it("is an instance of Error with correct name and status", () => {
    const err = new ApiError(422, "Unprocessable");
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe("ApiError");
    expect(err.status).toBe(422);
    expect(err.message).toBe("Unprocessable");
  });
});
