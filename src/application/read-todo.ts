import { apiService } from "@/services/api-service";
import { storeService } from "@/services/store-service";
import { notificationService } from "@/services/notification-service";

export const readTodos = async () => {
  const todos = await apiService.read();
  storeService.set(todos);
  notificationService.notify("read");
};
