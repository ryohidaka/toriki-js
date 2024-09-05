import { describe, it, beforeEach, expect } from "vitest";

import { Toriki } from "../src";

describe("Toriki", () => {
  let toriki: Toriki;

  beforeEach(() => {
    toriki = new Toriki();
  });

  it("初期化時にメニューをロードすること", () => {
    toriki.all();
  });

  it("フィルタリングされた全てのメニューを返すこと", () => {
    const params = { categories: ["貴族焼"] };
    toriki.all(params);
  });

  it("全てのカテゴリを返すこと", () => {
    const categories = toriki.categories();
    expect(categories).toEqual([
      "貴族焼",
      "塩焼",
      "たれ焼",
      "串焼き",
      "スピードメニュー",
      "逸品料理",
      "ご飯もの",
      "デザート",
      "ビール",
      "メガ",
      "チューハイ",
      "レモンサワー",
      "ハイボール",
      "お茶ハイ",
      "国産ジン",
      "カクテル",
      "果実酒",
      "ワイン",
      "焼酎",
      "日本酒",
      "梅酒",
      "ノンアルコール",
      "ソフトドリンク",
      "クラフトジュース",
      "コーヒー",
      "数量限定",
    ]);
  });

  it("IDに対応するメニューを返すこと", () => {
    const menu = toriki.getById(101);
    expect(menu).toEqual({
      calories: 231,
      id: 101,
      name: "もも貴族焼(たれ)",
      category: "貴族焼",
      imageUrl:
        "https://torikizoku.co.jp/assets/uploads/2024/03/momo_kizokuyaki_tare.jpg",
      salt: 1.9,
      isAlcohol: false,
      isDrink: false,
    });
  });

  it("存在しないIDに対してundefinedを返すこと", () => {
    const menu = toriki.getById(9999);
    expect(menu).toBeUndefined();
  });

  it("ランダムな組み合わせを返すこと", () => {
    toriki.random();
  });

  it("1品あたりの税込価格を返すこと", () => {
    const price = toriki.price();
    expect(price).toEqual(370);
  });
});
