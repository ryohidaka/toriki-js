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
};

/**
 * メニューの絞り込み条件のパラメータ
 */
export type TorikiMenuParams = {
  // カテゴリ名
  categories?: string[];
  // メニュー名
  name?: string;
};
