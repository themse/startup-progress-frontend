export interface WriteInterface<T> {
  create(item: T): Promise<T> | T;
  update(id: string, item: Partial<T>): Promise<T> | T;
  delete(id: string): Promise<void> | void;
}

export interface ReadInterface<T> {
  find(criteria?: unknown): Promise<T[]> | T[];
  findOne(id: string): Promise<T | null> | T | null;
}
