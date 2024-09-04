# toriki

[![NPM Version](https://img.shields.io/npm/v/toriki?logo=npm)](https://www.npmjs.com/package/toriki)
![build](https://github.com/ryohidaka/toriki-js/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/ryohidaka/toriki-js/graph/badge.svg?token=RHP9TB2F51)](https://codecov.io/gh/ryohidaka/toriki-js)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Overview

鳥貴族のメニューを取得する Node.js ライブラリ

## インストール

```shell
npm install toriki
```

## 使用方法

```ts
import { Toriki } from "toriki";

const toriki = new Toriki();

// 全てのメニューを取得
const menus = toriki.all();

// 条件を指定してメニューを取得
const filteredMenus = toriki.all({
  categories: ["貴族焼"],
});

// カテゴリを取得
const categories = toriki.categories();

// 特定のIDに対応するメニューを取得
const menu = toriki.getById(101);

// ランダムなメニューの組み合わせを取得
const randomMenus = toriki.random();
```

## メソッド

### `all(params?: TorikiMenuParams): Menu[]`

条件に合う全てのメニューの一覧を取得します。

#### 引数

- `params`（オプション）: フィルタリング条件

#### レスポンス

- `Menu[]`: メニューの配列

### `categories(): Category[]`

全てのカテゴリを取得します。

#### レスポンス

- `Category[]`: カテゴリの配列

### `getById(id: number): Menu | undefined`

指定した ID に対応するメニューを取得します。

#### 引数

- `id`: メニューの ID

#### レスポンス

- `Menu`: メニューオブジェクト。見つからない場合は`undefined`。

### `random(params?: TorikiMenuParams, count: number = 10, allowDuplicates: boolean = true,): Menu[]`

指定した総額に対応するランダムなメニューの組み合わせを取得します。

#### 引数

- `params`: フィルタリングの条件
- `count`: 任意の個数 (デフォルト: `10`)
- `allowDuplicates`: 重複許容フラグ (デフォルト: `true`)

#### レスポンス

- `Menu[]`: メニューの配列

## 型定義

### `TorikiMenuParams`

| パラメータ    | 型       | 説明              |
| ------------- | -------- | ----------------- |
| `categories`  | string[] | カテゴリ名        |
| `name`        | string   | メニュー名        |
| `caloriesMin` | number   | エネルギー (最小) |
| `caloriesMax` | number   | エネルギー (最大) |
| `saltMin`     | number   | 食塩相当量 (最小) |
| `saltMax`     | number   | 食塩相当量 (最大) |

### `Menu`

| フィールド | 型     | 説明             | サンプル                                                                   |
| ---------- | ------ | ---------------- | -------------------------------------------------------------------------- |
| `id`       | number | メニュー ID      | `101`                                                                      |
| `name`     | string | メニュー名       | `もも貴族焼(たれ)`                                                         |
| `category` | string | カテゴリ名       | `貴族焼`                                                                   |
| `imageUrl` | string | 画像 URL         | `https://torikizoku.co.jp/assets/uploads/2024/03/momo_kizokuyaki_tare.jpg` |
| `calories` | number | エネルギー(kcal) | `231`                                                                      |
| `salt`     | number | 食塩相当量(g)    | `1.9`                                                                      |

## Link

- https://github.com/ryohidaka/torikizoku-menus

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
