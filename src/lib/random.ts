import { Menu } from "@/types";

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
): Menu[] {
  if (allowDuplicates) {
    // 重複を許容してランダムにメニューを選択する
    const randomMenus = Array.from({ length: count }, () => {
      return menus[Math.floor(Math.random() * menus.length)];
    });

    return randomMenus.sort((a, b) => a.id - b.id);
  } else {
    // 重複なしでランダムなメニューの組み合わせを取得する
    const randomMenus = menus
      .slice()
      .sort(() => 0.5 - Math.random())
      .slice(0, count)
      .sort((a, b) => a.id - b.id);

    return randomMenus;
  }
}
