import type { Mock } from "vitest";
import { describe, it, expect, vi, afterEach } from "vitest";
import { deleteTodo } from "./delete-todo";
import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";

vi.mock("@/services/api-service-local-storage");
vi.mock("@/services/store-service-composition");
vi.mock("@/services/notification-service");

describe("deleteTodo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls apiService", async () => {
    await deleteTodo("test-id");

    expect(apiService.delete).toHaveBeenCalledWith("test-id");
  });

  describe("API returns OK", () => {
    it("calls storeService", async () => {
      await deleteTodo("test-id");

      expect(storeService.delete).toHaveBeenCalledWith("test-id");
    });

    it("calls notificationService", async () => {
      await deleteTodo("test-id");

      expect(notificationService.notify).toHaveBeenCalledWith("deleted");
    });
  });

  describe("API returns Error", () => {
    it("doesn't call storeService", async () => {
      (apiService.delete as Mock).mockRejectedValueOnce(
        new Error("Async error")
      );

      await deleteTodo("test-id");

      expect(storeService.delete).not.toHaveBeenCalled();
    });

    it("calls notificationService with error", async () => {
      const assertedError = "Async error";
      (apiService.delete as Mock).mockRejectedValueOnce(
        new Error(assertedError)
      );

      await deleteTodo("test-id");

      expect(notificationService.notify).toHaveBeenCalledWith(assertedError);
    });

    it("calls notificationService with unknown error", async () => {
      (apiService.delete as Mock).mockRejectedValueOnce("whatever");

      await deleteTodo("test-id");

      expect(notificationService.notify).toHaveBeenCalledWith("unknown error");
    });
  });
});
