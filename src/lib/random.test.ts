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
      calories: 231,
      salt: 1.9,
    },
    {
      id: 102,
      name: "もも貴族焼(塩)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/momo_kizokuyaki_shio.jpg",
      calories: 208,
      salt: 1.8,
    },
    {
      id: 103,
      name: "もも貴族焼(スパイス)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/momo_kizokuyaki_spice.jpg",
      calories: 215,
      salt: 4.5,
    },
    {
      id: 104,
      name: "むね貴族焼(たれ)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/mune_kizokuyaki_tare.jpg",
      calories: 165,
      salt: 1.5,
    },
    {
      id: 105,
      name: "むね貴族焼(塩)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/mune_kizokuyaki_shio.jpg",
      calories: 146,
      salt: 1.7,
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
