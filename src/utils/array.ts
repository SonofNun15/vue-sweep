export function count<TItem>(collection: TItem[], selector: (item: TItem) => boolean): number {
  return collection.filter(selector).length;
}
