import { PRICE_WITH_TAX } from "@/constants";
import { Menu, RandomMenus } from "@/types";

/**
 * メニューからランダムな組み合わせを取得する関数
 *
 * @param menus - メニューの配列
 * @param count - 任意の個数
 * @param allowDuplicates - 重複を許容するかどうかのフラグ
 * @returns ランダムな組み合わせのメニュー
 */
export function getRandomMenus(
  menus: Menu[],
  count: number,
  allowDuplicates: boolean,
): RandomMenus {
  let randomMenus: Menu[];

  if (allowDuplicates) {
    // 重複を許容してランダムにメニューを選択する
    randomMenus = Array.from({ length: count }, () => {
      return menus[Math.floor(Math.random() * menus.length)];
    });
  } else {
    // 重複なしでランダムなメニューの組み合わせを取得する
    randomMenus = menus
      .slice()
      .sort(() => 0.5 - Math.random())
      .slice(0, count)
      .sort((a, b) => a.id - b.id);
  }

  randomMenus.sort((a, b) => a.id - b.id);

  // 食塩相当量の総額を取得する
  const totalSalt = parseFloat(
    randomMenus.reduce((sum, menu) => sum + (menu.salt ?? 0), 0).toFixed(2),
  );

  // エネルギーの総額を取得する
  const totalCalorie = randomMenus.reduce(
    (sum, menu) => sum + (menu.calories ?? 0),
    0,
  );

  // 税込価格の総額を取得する
  const totalPriceWithTax = randomMenus.length * PRICE_WITH_TAX;

  return {
    menus: randomMenus,
    totalSalt,
    totalCalorie,
    totalPriceWithTax,
  };
}
