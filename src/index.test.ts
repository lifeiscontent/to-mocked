import { test, expect, describe } from "vitest";
import { toMocked } from ".";

describe("toMocked", () => {
  test("Object", () => {
    const mockedUser = toMocked<{
      name: string;
      age: number;
    }>({
      name: "John",
    });

    expect(mockedUser.name).toBe("John");
    expect(() => mockedUser.age).toThrowErrorMatchingInlineSnapshot(
      '"Property age does not exist on {\\"name\\":\\"John\\"}"'
    );
  });

  test("Array", () => {
    const mockedUser = toMocked<[string, string]>(["John"]);

    expect(mockedUser[0]).toBe("John");
    expect(() => mockedUser[1]).toThrowErrorMatchingInlineSnapshot(
      '"Property 1 does not exist on [\\"John\\"]"'
    );
  });
});
