import {
  describe,
  it,
  expect,
  vi,
  afterEach,
  beforeEach,
  type Mock,
} from "vitest";
import { toggleTodo } from "./toggle-todo";
import { toggleTodo as _toggleTodo } from "@/domain/Todo";
import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";

vi.mock("@/services/api-service-local-storage");
vi.mock("@/services/store-service-composition");
vi.mock("@/services/notification-service");
vi.mock("@/domain/Todo");

describe("toggleTodo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("calls storeService", async () => {
    await toggleTodo("test-id");

    expect(storeService.getById).toHaveBeenCalledWith("test-id");
  });

  describe("storeService returns todo", () => {
    const todo = { id: "test-id" };
    beforeEach(() => {
      (storeService.getById as Mock).mockReturnValueOnce({ id: "test-id" });
      (_toggleTodo as Mock).mockReturnValueOnce(todo);
    });

    it("calls toggleTodo from domain", async () => {
      await toggleTodo("test-id");

      expect(_toggleTodo).toHaveBeenCalledWith(
        expect.objectContaining({ id: "test-id" })
      );
    });

    it("calls apiService with toggled todo", async () => {
      await toggleTodo("test-id");

      expect(apiService.update).toHaveBeenCalledWith(todo);
    });

    it("calls storeService with toggled todo", async () => {
      await toggleTodo("test-id");

      expect(storeService.update).toHaveBeenCalledWith(todo);
    });

    it("calls notificationService", async () => {
      await toggleTodo("test-id");

      expect(notificationService.notify).toHaveBeenCalledWith("toggled");
    });

    describe("API returns OK", () => {
      it("calls storeService", async () => {
        await toggleTodo("test-id");

        expect(storeService.update).toHaveBeenCalledWith(todo);
      });

      it("calls notificationService", async () => {
        await toggleTodo("test-id");

        expect(notificationService.notify).toHaveBeenCalledWith("toggled");
      });
    });

    describe("API returns Error", () => {
      it("doesn't call storeService", async () => {
        (apiService.update as Mock).mockRejectedValueOnce(
          new Error("Async error")
        );

        await toggleTodo("test-id");

        expect(storeService.delete).not.toHaveBeenCalled();
      });

      it("calls notificationService with error", async () => {
        const assertedError = "Async error";
        (apiService.update as Mock).mockRejectedValueOnce(
          new Error(assertedError)
        );

        await toggleTodo("test-id");

        expect(notificationService.notify).toHaveBeenCalledWith(assertedError);
      });

      it("calls notificationService with unknown error", async () => {
        (apiService.update as Mock).mockRejectedValueOnce("whatever");

        await toggleTodo("test-id");

        expect(notificationService.notify).toHaveBeenCalledWith(
          "unknown error"
        );
      });
    });
  });

  describe("storeService doesn't returns todo", () => {
    beforeEach(() => {
      (storeService.getById as Mock).mockReturnValueOnce(undefined);
    });

    it("doesn't call toggleTodo from domain", async () => {
      await toggleTodo("test-id");

      expect(_toggleTodo).not.toHaveBeenCalled();
    });

    it("doesn't call apiService", async () => {
      await toggleTodo("test-id");

      expect(apiService.update).not.toHaveBeenCalled();
    });

    it("doesn't call storeService", async () => {
      await toggleTodo("test-id");

      expect(storeService.update).not.toHaveBeenCalled();
    });

    it("doesn't call notificationService", async () => {
      await toggleTodo("test-id");

      expect(notificationService.notify).not.toHaveBeenCalled();
    });
  });
});
