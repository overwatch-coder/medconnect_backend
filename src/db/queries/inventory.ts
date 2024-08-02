import { Inventory } from "../models/inventory";
import type { InventoryData } from "../../types/chps-compound";

export const createInventory = async (data: InventoryData) =>
  await Inventory.create(data);

export const fetchInventories = async (chpsId: string) =>
  await Inventory.find({ chpsCompoundId: chpsId });
export const fetchInventoryById = async (id: string) =>
  await Inventory.findById(id);

export const fetchChpsInventory = async (chpsId: string, id: string) =>
  await Inventory.findOne({ chpsCompoundId: chpsId, _id: id });

export const deleteChpsInventory = async (chpsId: string, id: string) =>
  await Inventory.findOneAndDelete({ chpsCompoundId: chpsId, _id: id });

export const updateChpsInventory = async (
  chpsId: string,
  id: string,
  data: InventoryData
) =>
  await Inventory.findOneAndUpdate({ chpsCompoundId: chpsId, _id: id }, data, {
    new: true,
  });
