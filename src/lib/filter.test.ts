import { Menu, TorikiMenuParams } from "@/types";
import { getFilteredMenus } from "./filter";

const mockMenus: Menu[] = [
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
    id: 2101,
    name: "ザ・プレミアム・モルツ",
    category: "ビール",
    imageUrl: "",
    calories: 120,
    isDrink: true,
    isAlcohol: true,
  },
  {
    id: 4101,
    name: "ウーロン茶",
    category: "ソフトドリンク",
    imageUrl: "",
    calories: 2,
    isDrink: true,
    isAlcohol: false,
  },
  {
    id: 9901,
    name: "抜刀唐揚 ～紅生姜編～",
    category: "数量限定",
    imageUrl:
      "https://torikizoku.co.jp/assets/uploads/2024/07/karaagre_benishouga.jpg",
    calories: 362,
    salt: 2.2,
    isDrink: false,
    isAlcohol: false,
  },
];

describe("getFilteredMenus", () => {
  // カテゴリーフィルタリング
  it("カテゴリーフィルタリングのテスト", () => {
    const params: TorikiMenuParams = { categories: ["貴族焼"] };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[0]]);
  });

  // カテゴリーフィルタリング - 空のカテゴリーリスト
  it("カテゴリーフィルタリングのテスト - 空のカテゴリーリスト", () => {
    const params: TorikiMenuParams = { categories: [] };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual(mockMenus);
  });

  // 日本語名でのフィルタリング
  it("日本語名でのフィルタリングのテスト", () => {
    const params: TorikiMenuParams = { name: "もも貴族焼(たれ)" };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[0]]);
  });

  // カロリーフィルタリング
  it("カロリーフィルタリングのテスト", () => {
    const params: TorikiMenuParams = { caloriesMin: 200 };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[0], mockMenus[3]]);
  });

  // 塩分フィルタリング
  it("塩分フィルタリングのテスト", () => {
    const params: TorikiMenuParams = { saltMax: 2 };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[0]]);
  });

  // 塩分フィルタリング - メニューに塩分がない場合
  it("塩分フィルタリングのテスト - メニューに塩分がない場合", () => {
    const mockMenusNoSalt: Menu[] = [
      ...mockMenus,
      { ...mockMenus[0], salt: undefined },
    ];
    const params: TorikiMenuParams = { saltMax: 1.5 };
    const result = getFilteredMenus(mockMenusNoSalt, params);
    expect(result).toEqual([]);
  });

  // 数量限定メニューの除外
  it("数量限定メニューの除外", () => {
    const params: TorikiMenuParams = { excludedLimitedQuantity: true };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[0], mockMenus[1], mockMenus[2]]);
  });

  // paramsが未定義の場合のテスト
  it("paramsが未定義の場合のテスト", () => {
    const result = getFilteredMenus(mockMenus);
    expect(result).toEqual(mockMenus);
  });

  // 全フィルタが適用されない場合のテスト
  it("全フィルタが適用されない場合のテスト", () => {
    const params: TorikiMenuParams = {
      name: "もも貴族焼(たれ)",
      categories: ["ビール"],
    };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([]);
  });

  // 複数フィルタの組み合わせテスト
  it("複数フィルタの組み合わせテスト", () => {
    const params: TorikiMenuParams = {
      name: "もも貴族焼(たれ)",
      categories: ["貴族焼"],
    };
    const result = getFilteredMenus(mockMenus, params);
    expect(result).toEqual([mockMenus[0]]);
  });
});
