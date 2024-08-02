import { Model } from "mongoose";

interface UniqueChecker<T, Z, Q> {
  model: Model<T>;
  data: Z;
  filter: Record<string, string>;
}

export async function checkUniques<T, Z extends Record<string, any>, Q>(
  params: UniqueChecker<T, Z, Q>
) {
  const { model, data, filter } = params;
  const uniques: Partial<Z> = {};
  const entity: Z | null = await model.findOne(filter);
  if (!entity) return null;

  for (const key of Object.keys(data)) {
    if (data[key] !== entity[key]) (uniques as any)[key] = data[key];
  }
  return uniques;
}
