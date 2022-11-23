import { apiService } from "@/services/api-service-local-storage";
import { storeService } from "@/services/store-service-composition";
import { notificationService } from "@/services/notification-service";

export const getTodos = async () => {
  const todos = await apiService.getAll();
  storeService.set(todos);
  notificationService.notify("getTodos done");
};
