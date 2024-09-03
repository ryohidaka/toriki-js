import { Toriki } from "..";

export function MenuTable() {
  const toriki = new Toriki();
  const menus = toriki.all();

  const categories = toriki.categories();
  console.log(categories);

  return `
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">メニューID</th>
          <th scope="col">メニュー名</th>
          <th scope="col">カテゴリ名</th>
          <th scope="col">画像</th>
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
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `;
}
