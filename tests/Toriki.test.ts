import { describe, it, beforeEach } from "vitest";

import { Toriki } from "../src";

describe("Toriki", () => {
  let toriki: Toriki;

  beforeEach(() => {
    toriki = new Toriki();
  });

  it("初期化時にメニューをロードすること", () => {
    toriki.all();
  });
});
