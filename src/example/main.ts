import { MenuTable } from "./menu-table.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div id="menu-table"></div>
  </div>
`;

document.querySelector<HTMLDivElement>("#menu-table")!.innerHTML = MenuTable();
