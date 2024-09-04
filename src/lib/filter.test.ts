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
  },
  {
    id: 2101,
    name: "ザ・プレミアム・モルツ",
    category: "ビール",
    imageUrl: "",
    calories: 120,
  },
  {
    id: 4101,
    name: "ウーロン茶",
    category: "ソフトドリンク",
    imageUrl: "",
    calories: 2,
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
