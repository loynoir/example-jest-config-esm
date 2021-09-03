// @ts-nocheck

import toplevelAwait from "@loynoir/example-toplevel-await";
import importMetaUrl from "@loynoir/example-import-meta-url";
import toplevelThis from "@loynoir/example-toplevel-this";

describe("ESMOnly (hard core)", () => {
  it("hard core ESM", () => {
    expect(toplevelAwait).toEqual(true);
    expect(importMetaUrl).toMatch(/^file:\/\//);
    expect(typeof toplevelThis).toEqual("undefined");
  });

  it("hard core ESM import()", async () => {
    const toplevelAwait = (await import("@loynoir/example-toplevel-await"))
      .default;
    const importMetaUrl = (await import("@loynoir/example-import-meta-url"))
      .default;
    const toplevelThis = (await import("@loynoir/example-toplevel-this"))
      .default;

    expect(toplevelAwait).toEqual(true);
    expect(importMetaUrl).toMatch(/^file:\/\//);
    expect(typeof toplevelThis).toEqual("undefined");
  });
});
