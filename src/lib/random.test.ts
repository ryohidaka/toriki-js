import { describe, it, expect } from "vitest";
import { Menu } from "@/types";
import { getRandomMenus } from "./random";
import { PRICE_WITH_TAX } from "@/constants";

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
      isDrink: false,
      isAlcohol: false,
    },
    {
      id: 102,
      name: "もも貴族焼(塩)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/momo_kizokuyaki_shio.jpg",
      calories: 208,
      salt: 1.8,
      isDrink: false,
      isAlcohol: false,
    },
    {
      id: 103,
      name: "もも貴族焼(スパイス)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/momo_kizokuyaki_spice.jpg",
      calories: 215,
      salt: 4.5,
      isDrink: false,
      isAlcohol: false,
    },
    {
      id: 104,
      name: "むね貴族焼(たれ)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/mune_kizokuyaki_tare.jpg",
      calories: 165,
      salt: 1.5,
      isDrink: false,
      isAlcohol: false,
    },
    {
      id: 105,
      name: "むね貴族焼(塩)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/mune_kizokuyaki_shio.jpg",
      calories: 146,
      salt: 1.7,
      isDrink: false,
      isAlcohol: false,
    },
  ];

  it("id昇順にソートされて返却されること", () => {
    const result = getRandomMenus(sampleMenus, 3, false).menus;
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].id).toBeLessThan(result[i + 1].id);
    }
  });

  it("count=0の場合は空配列が返却されること", () => {
    const result = getRandomMenus(sampleMenus, 0, true).menus;
    expect(result).toHaveLength(0);
  });

  it("count=3の場合は3件の配列が返却されること", () => {
    const result = getRandomMenus(sampleMenus, 3, true).menus;
    expect(result).toHaveLength(3);
  });

  it("count=3かつallowDuplicates=falseの場合は3件の重複のない配列が返却されること", () => {
    const result = getRandomMenus(sampleMenus, 3, false).menus;
    expect(result).toHaveLength(3);
    // 重複なしで選択されていることを確認
    const ids = result.map((menu) => menu.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("総エネルギー量と総食塩相当量が正しく計算されること", () => {
    const result = getRandomMenus(sampleMenus, 3, true);
    const totalCalorie = result.menus.reduce(
      (sum, menu) => sum + (menu.calories ?? 0),
      0,
    );
    const totalSalt = parseFloat(
      result.menus.reduce((sum, menu) => sum + (menu.salt ?? 0), 0).toFixed(2),
    );
    expect(result.totalCalorie).toBe(totalCalorie);
    expect(result.totalSalt).toBe(totalSalt);
  });

  it("税込価格の総額が正しく計算されること", () => {
    const result = getRandomMenus(sampleMenus, 3, true);
    expect(result.totalPriceWithTax).toBe(3 * PRICE_WITH_TAX);
  });
});
