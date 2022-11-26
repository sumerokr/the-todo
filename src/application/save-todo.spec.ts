import type { Mock } from "vitest";
import { describe, it, expect, vi, afterEach } from "vitest";
import { saveTodo } from "./save-todo";
import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";

vi.mock("@/services/api-service-local-storage");
vi.mock("@/services/store-service-composition");
vi.mock("@/services/notification-service");

describe("saveTodo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls apiService", async () => {
    await saveTodo("test-title");

    expect(apiService.save).toHaveBeenCalledWith(
      expect.objectContaining({ title: "test-title", isComplete: false })
    );
  });

  describe("API returns OK", () => {
    it("calls storeService", async () => {
      await saveTodo("test-title");

      expect(storeService.save).toHaveBeenCalledWith(
        expect.objectContaining({ title: "test-title", isComplete: false })
      );
    });

    it("calls notificationService", async () => {
      await saveTodo("test-title");

      expect(notificationService.notify).toHaveBeenCalledWith("saved");
    });
  });

  describe("API returns Error", () => {
    it("doesn't call storeService", async () => {
      (apiService.save as Mock).mockRejectedValueOnce(new Error("Async error"));

      await saveTodo("test-title");

      expect(storeService.save).not.toHaveBeenCalled();
    });

    it("calls notificationService with error", async () => {
      const assertedError = "Async error";
      (apiService.save as Mock).mockRejectedValueOnce(new Error(assertedError));

      await saveTodo("test-title");

      expect(notificationService.notify).toHaveBeenCalledWith(assertedError);
    });

    it("calls notificationService with unknown error", async () => {
      (apiService.save as Mock).mockRejectedValueOnce("whatever");

      await saveTodo("test-title");

      expect(notificationService.notify).toHaveBeenCalledWith("unknown error");
    });
  });
});
