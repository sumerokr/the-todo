import type { Mock } from "vitest";
import { describe, it, expect, vi, afterEach } from "vitest";
import { getTodos } from "./get-todos";
import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";

vi.mock("@/services/api-service-local-storage");
vi.mock("@/services/store-service-composition");
vi.mock("@/services/notification-service");

describe("getTodos", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls apiService", async () => {
    await getTodos();

    expect(apiService.getAll).toHaveBeenCalled();
  });

  describe("API returns OK", () => {
    it("calls storeService", async () => {
      (apiService.getAll as Mock).mockReturnValueOnce([]);
      await getTodos();

      expect(storeService.set).toHaveBeenCalledWith(expect.arrayContaining([]));
    });

    it("calls notificationService", async () => {
      await getTodos();

      expect(notificationService.notify).toHaveBeenCalledWith("received");
    });
  });

  describe("API returns Error", () => {
    it("doesn't call storeService", async () => {
      (apiService.getAll as Mock).mockRejectedValueOnce(
        new Error("Async error")
      );

      await getTodos();

      expect(storeService.set).not.toHaveBeenCalled();
    });

    it("calls notificationService with error", async () => {
      const assertedError = "Async error";
      (apiService.getAll as Mock).mockRejectedValueOnce(
        new Error(assertedError)
      );

      await getTodos();

      expect(notificationService.notify).toHaveBeenCalledWith(assertedError);
    });

    it("calls notificationService with unknown error", async () => {
      (apiService.getAll as Mock).mockRejectedValueOnce("whatever");

      await getTodos();

      expect(notificationService.notify).toHaveBeenCalledWith("unknown error");
    });
  });
});
