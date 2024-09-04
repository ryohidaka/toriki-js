import { Toriki, TorikiMenuParams } from "..";

type MenuTableProps = {
  params?: TorikiMenuParams;
};

export function MenuTable({ params }: MenuTableProps) {
  const toriki = new Toriki();
  const menus = toriki.all(params);

  const randomMenus = toriki.random();
  console.log(randomMenus);

  return `
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">メニューID</th>
          <th scope="col">メニュー名</th>
          <th scope="col">カテゴリ名</th>
          <th scope="col">画像</th>
          <th scope="col">エネルギー(kcal)</th>
          <th scope="col">食塩相当量(g)</th>
        </tr>
      </thead>
      <tbody id="menu-table">
        ${menus
          .map(
            (menu) => `
          <tr id="${menu.id}">
            <th scope="row">${menu.id}</th>
            <td>${menu.name}</td>
            <td>${menu.category}</td>
            <td>
              <img src="${menu.imageUrl}" alt="${menu.name}" width="100" />
            </td>
            <td>${menu.calories}</td>
            <td>${menu.salt ?? ""}</td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `;
}
