import fetch from "node-fetch";
import { objectToCamel } from "ts-case-convert";
import { Project } from "ts-morph";

// データを取得してTypeScriptファイルに出力する関数
async function fetchAndSaveJsonToTs() {
  const url =
    "https://raw.githubusercontent.com/ryohidaka/torikizoku-menus/main/dist/torikizoku.json";

  try {
    // JSONデータを取得
    const response = await fetch(url);
    const data = await response.json();
    const menus = objectToCamel(data.menus);

    const formattedMenus = menus.map((menu) => {
      return {
        ...menu,
        salt: menu.salt > 0 ? menu.salt : undefined,
      };
    });

    // ts-morphを使用してTypeScriptファイルを生成
    const project = new Project();
    const sourceFile = project.createSourceFile("src/menus.ts", "", {
      overwrite: true,
    });

    // 自動生成の警告コメントを追加
    sourceFile.addStatements(
      `// This file is auto-generated. Do not edit directly.`,
    );
    sourceFile.addStatements(`// @see ${url}`);

    // ファイルにインポート文と型宣言を追加
    sourceFile.addImportDeclaration({
      namedImports: ["Menu"],
      moduleSpecifier: "@/types",
    });

    // MENUS定数を追加
    sourceFile.addVariableStatement({
      declarationKind: "const",
      declarations: [
        {
          name: "MENUS",
          type: "Menu[]",
          initializer: JSON.stringify(formattedMenus, null, 2).replace(
            /"(\w+)":/g,
            "$1:",
          ),
        },
      ],
      isExported: true,
    });

    // ファイルを書き出す
    await sourceFile.save();

    console.log("データをmenus.tsに保存しました");
  } catch (error) {
    console.error("データの取得または保存に失敗しました:", error);
  }
}

// 関数を実行
fetchAndSaveJsonToTs();
