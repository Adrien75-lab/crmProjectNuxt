import type { Item } from "./item";

export interface Reminder extends Item {
  created_at?: string;
  note?: string;
  dueDate?: string;
  organization?: any;
  User?: string;
  createdAt?: string;
  user?: string;
}
