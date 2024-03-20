import type { Item } from "./item";

export interface Organization extends Item {
  name?: string;
  status?: string;
  referent_name?: string;
  referent_function?: string;
  referentName?: string;
  referentFunction?: string;
}
