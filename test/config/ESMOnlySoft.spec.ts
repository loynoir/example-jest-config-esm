// @ts-nocheck

import nf from "node-fetch";

// import toplevelAwait from '@loynoir/example-toplevel-await'
// import importMetaUrl from '@loynoir/example-import-meta-url'
import toplevelThis from "@loynoir/example-toplevel-this";

const FLAG_JEST_ESM_NATIVE = process.env["NODE_OPTIONS"]?.includes(
  "--experimental-vm-modules"
);

describe("ESMOnly (soft core)", () => {
  it("node-fetch", () => {
    expect(typeof nf).toEqual("function");
  });

  it("node-fetch import()", async () => {
    const nf2 = (await import("node-fetch")).default;
    expect(typeof nf2).toEqual("function");
  });

  it("faking hard core ESM", () => {
    // Only test faking ability
    if (FLAG_JEST_ESM_NATIVE) return;

    // expect(toplevelAwait).toEqual(true);
    // expect(importMetaUrl).toMatch(/^file:\/\//);
    expect(typeof toplevelThis).toEqual("object");
  });

  it("faking hard core ESM import()", async () => {
    // Only test faking ability
    if (FLAG_JEST_ESM_NATIVE) return;

    // const toplevelAwait = (await import("@loynoir/example-toplevel-await")).default;
    // const importMetaUrl = (await import("@loynoir/example-import-meta-url")).default;
    const toplevelThis = (await import("@loynoir/example-toplevel-this"))
      .default;

    // expect(toplevelAwait).toEqual(true);
    // expect(importMetaUrl).toMatch(/^file:\/\//);
    expect(typeof toplevelThis).toEqual("object");
  });
});
