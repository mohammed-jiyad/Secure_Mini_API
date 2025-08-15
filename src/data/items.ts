import type { Item } from '../types';
import itemsData from './grocery-items-rn-assignment.json';

// Convert the object into an array of items
export const ITEMS: Item[] = Object.entries(itemsData).map(([id, data]: [string, any]) => ({
  id, // use the object key as the ID
  name: data.name,
  category: data.category,
  restricted: data.restricted ?? false // default to false if missing
}));
