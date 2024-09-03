import { MENUS } from "./menus";
import { Menu } from "./types";

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
   * 全てのメニューを取得する
   * @returns メニューの配列
   */
  all(): Menu[] {
    return this.menus;
  }

  /**
   * 全てのカテゴリを取得する
   * @returns カテゴリの配列
   */
  categories(): string[] {
    return [...new Set(this.menus.map((menu) => menu.category))];
  }
}
