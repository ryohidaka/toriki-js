/**
 * メニュー
 *
 * @see https://github.com/ryohidaka/torikizoku-menus/blob/main/docs/database.md#%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0
 */
export type Menu = {
  // メニュー ID
  id: number;
  // メニュー名
  name: string;
  // カテゴリ名
  category: string;
  // 画像URL
  imageUrl?: string;
  // エネルギー(kcal)
  calories: number;
  // 食塩相当量(g)
  salt?: number;
};

/**
 * メニューの絞り込み条件のパラメータ
 */
export type TorikiMenuParams = {
  // カテゴリ名
  categories?: string[];
  // メニュー名
  name?: string;
  // エネルギー (最小)
  caloriesMin?: number;
  // エネルギー (最大)
  caloriesMax?: number;
  // 食塩相当量 (最小)
  saltMin?: number;
  // 食塩相当量 (最大)
  saltMax?: number;
  // 数量限定メニューを除外するフラグ
  excludedLimitedQuantity?: boolean;
};

/**
 * ランダムなメニューの組み合わせ
 */
export type RandomMenus = {
  // 組み合わせ内のメニュー一覧
  menus: Menu[];
  // 食塩相当量の総額
  totalSalt: number;
  // エネルギーの総額
  totalCalorie: number;
  // 税込価格の総額
  totalPriceWithTax: number;
};
