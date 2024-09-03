import { getFilteredMenus } from "./lib";
import { MENUS } from "./menus";
import { Menu, TorikiMenuParams } from "./types";

/**
 * 鳥貴族のメニューを管理するクラス
 */
export class Toriki {
  // メニューリストを格納するための配列
  private menus: Menu[] = [];

  /**
   * コンストラクタ
   * インスタンス生成時にメニューをロードする
   */
  constructor() {
    this.menus = MENUS;
  }

  /**
   * 条件に合う全てのメニューを取得する
   * @param params - フィルタリングの条件
   * @returns フィルタリングされたメニューの配列
   */
  all(params?: TorikiMenuParams): Menu[] {
    return getFilteredMenus(this.menus, params);
  }

  /**
   * 全てのカテゴリを取得する
   * @returns カテゴリの配列
   */
  categories(): string[] {
    return [...new Set(this.menus.map((menu) => menu.category))];
  }

  /**
   * 指定したIDに対応するメニューを取得する
   * @param id - メニューのID
   * @returns 指定したIDのメニュー、見つからない場合はundefined
   */
  getById(id: number): Menu | undefined {
    return this.menus.find((menu) => menu.id === id);
  }
}
