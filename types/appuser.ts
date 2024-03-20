import type { Item } from "./item";

export interface AppUser extends Item {
  lastName?: string;
  firstName?: string;
  last_login?: string;
  created_at?: string;
  deleted_at?: string;
  organization?: any;
  lastLogin?: string;
  createdAt?: string;
  deletedAt?: string;
}
