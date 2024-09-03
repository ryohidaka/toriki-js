import { Toriki } from "@/Toriki.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div></div>
`;

const toriki = new Toriki();

// メニュー一覧を取得
const menus = toriki.all();
console.log(menus);
