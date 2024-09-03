import { TorikiMenuParams } from "@/types";
import { FilterForm } from "./filter-form";
import { MenuTable } from "./menu-table";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container text-start">
    <div id="filter-form"></div>
    <div id="menu-table"></div>
  </div>
`;

const renderTable = (params?: TorikiMenuParams) => {
  document.querySelector<HTMLDivElement>("#menu-table")!.innerHTML = MenuTable({
    params,
  });
};

const filterFormHtml = FilterForm({
  onFilter: renderTable,
});
document.querySelector<HTMLDivElement>("#filter-form")!.innerHTML =
  filterFormHtml;

// 初期テーブルの表示
renderTable();
