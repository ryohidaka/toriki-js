import { Menu, TorikiMenuParams } from "@/types";

/**
 * メニューリストをフィルタリングする関数
 *
 * @param menus - フィルタリング対象のメニューリスト
 * @param params - フィルタリング条件
 * @returns フィルタリングされたメニューリスト
 */
export function getFilteredMenus(
  menus: Menu[],
  params?: TorikiMenuParams,
): Menu[] {
  if (!params) return menus;

  const { categories, name } = params;

  return menus
    .filter((menu) => filterByCategories(menu, categories))
    .filter((menu) => filterByName(menu, name));
}

/**
 * メニューリストをカテゴリーでフィルタリングする関数
 *
 * @param menu - フィルタリング対象のメニュー
 * @param categories - 含めたいカテゴリーのリスト
 * @returns フィルタリング条件を満たすかどうかの真偽値
 */
function filterByCategories(menu: Menu, categories?: string[]): boolean {
  if (categories && categories.length > 0) {
    return categories.includes(menu.category);
  }
  return true;
}

/**
 * メニューリストを日本語名でフィルタリングする関数
 *
 * @param menu - フィルタリング対象のメニュー
 * @param name - フィルタリングに使用する日本語のメニュー名
 * @returns フィルタリング条件を満たすかどうかの真偽値
 */
function filterByName(menu: Menu, name?: string): boolean {
  if (name) {
    return menu.name.includes(name);
  }
  return true;
}
