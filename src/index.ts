export function toMocked<T extends object>(value: any): T {
  return new Proxy<T>(value, {
    get(target: any, property: string | symbol, receiver: any) {
      if (!Reflect.has(target, property)) {
        throw new Error(
          `Property ${String(property)} does not exist on ${JSON.stringify(
            target
          )}`
        );
      }

      const value = Reflect.get(target, property, receiver);
      return typeof value === "object" ? toMocked(value) : value;
    },
  }) as T;
}
