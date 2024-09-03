import { describe, it, expect } from "vitest";

import { Menu } from "@/types";
import { getRandomMenus } from "./random";

describe("getRandomMenus", () => {
  const sampleMenus: Menu[] = [
    {
      id: 101,
      name: "もも貴族焼(たれ)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/momo_kizokuyaki_tare.jpg",
    },
    {
      id: 102,
      name: "もも貴族焼(塩)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/momo_kizokuyaki_shio.jpg",
    },
    {
      id: 103,
      name: "もも貴族焼(スパイス)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/momo_kizokuyaki_spice.jpg",
    },
    {
      id: 104,
      name: "むね貴族焼(たれ)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/mune_kizokuyaki_tare.jpg",
    },
    {
      id: 105,
      name: "むね貴族焼(塩)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/mune_kizokuyaki_shio.jpg",
    },
  ];

  it("id昇順にソートされて返却されること", () => {
    const result = getRandomMenus(sampleMenus, 3, false);
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].id).toBeLessThan(result[i + 1].id);
    }
  });

  it("count=0の場合は空配列が返却されること", () => {
    const result = getRandomMenus(sampleMenus, 0, true);
    expect(result).toHaveLength(0);
  });

  it("count=10の場合は10件の配列が返却されること", () => {
    const result = getRandomMenus(sampleMenus, 3, true);
    expect(result).toHaveLength(3);
  });

  it("count=10かつallowDuplicates=falseの場合は10件の重複のない配列が返却されること", () => {
    const result = getRandomMenus(sampleMenus, 3, false);
    expect(result).toHaveLength(3);
    // 重複なしで選択されていることを確認
    const ids = result.map((menu) => menu.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
