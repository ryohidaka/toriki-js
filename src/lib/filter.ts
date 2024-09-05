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

  const {
    categories,
    name,
    caloriesMin,
    caloriesMax,
    saltMin,
    saltMax,
    excludedLimitedQuantity,
  } = params;

  return menus
    .filter((menu) => filterByCategories(menu, categories))
    .filter((menu) => filterByName(menu, name))
    .filter((menu) => filterByCalories(menu, caloriesMin, caloriesMax))
    .filter((menu) => filterBySalt(menu, saltMin, saltMax))
    .filter((menu) => !excludedLimitedQuantity || menu.category !== "数量限定");
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

/**
 * メニューリストをカロリーでフィルタリングする関数
 *
 * @param menu - フィルタリング対象のメニュー
 * @param caloriesMin - 最低カロリー (この値以上のメニューを含める)
 * @param caloriesMax - 最高カロリー (この値以下のメニューを含める)
 * @returns フィルタリング条件を満たすかどうかの真偽値
 */
function filterByCalories(
  menu: Menu,
  caloriesMin?: number,
  caloriesMax?: number,
): boolean {
  if (
    caloriesMin !== undefined &&
    menu.calories !== undefined &&
    menu.calories < caloriesMin
  )
    return false;
  if (
    caloriesMax !== undefined &&
    menu.calories !== undefined &&
    menu.calories > caloriesMax
  )
    return false;

  if (
    (caloriesMin !== undefined || caloriesMax !== undefined) &&
    !menu.calories
  )
    return false;
  return true;
}

/**
 * メニューリストを塩分でフィルタリングする関数
 *
 * @param menu - フィルタリング対象のメニュー
 * @param saltMin - 最低塩分 (この値以上のメニューを含める)
 * @param saltMax - 最高塩分 (この値以下のメニューを含める)
 * @returns フィルタリング条件を満たすかどうかの真偽値
 */
function filterBySalt(menu: Menu, saltMin?: number, saltMax?: number): boolean {
  if (saltMin !== undefined && menu.salt !== undefined && menu.salt < saltMin)
    return false;
  if (saltMax !== undefined && menu.salt !== undefined && menu.salt > saltMax)
    return false;
  if ((saltMin !== undefined || saltMax !== undefined) && !menu.salt)
    return false;
  return true;
}
