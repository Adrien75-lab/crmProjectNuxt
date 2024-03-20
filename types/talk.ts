import type { Item } from "./item";

export interface Talk extends Item {
  datetime?: string;
  note?: string;
  organization?: any;
  user?: any;
  talks?: any;
}
