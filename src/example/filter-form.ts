import { Toriki, TorikiMenuParams } from "..";

type FilterFormProps = {
  onFilter: (params: TorikiMenuParams) => void;
};

export function FilterForm({ onFilter }: FilterFormProps): string {
  const toriki = new Toriki();
  const menus = toriki.all();
  const menuNames = menus.map((menu) => menu.name);
  const categories = toriki.categories();

  const formHtml = `
    <div class="mb-3">
      <div class="row mb-3">
        <div class="col">
          <label for="name" class="form-label">メニュー名</label>
          <input type="text" class="form-control" id="name" placeholder="もも貴族焼(たれ)" list="nameOptions">
          <datalist id="nameOptions">
            ${menuNames.map(
              (name) => `
              <option>${name}</option>
            `,
            )}
          </datalist>
        </div>

        <div class="col">
          <label for="categories" class="form-label">カテゴリー</label>
          <input type="text" class="form-control" id="categories" placeholder="貴族焼" list="categoryOptions">
          <datalist id="categoryOptions">
            ${categories.map(
              (category) => `
              <option>${category}</option>
            `,
            )}
          </datalist>
        </div>
      </div>

      <div class="row">
        <button id="filter" type="button" class="btn btn-primary">フィルターを適用</button>
      </div>
    </div>
  `;

  // フィルターボタンのイベントリスナーを設定するコードは後で実行
  setTimeout(() => {
    const filterButton = document.querySelector("#filter");
    if (filterButton) {
      filterButton.addEventListener("click", handleFilter);
    }
  }, 0);

  function handleFilter() {
    const categoriesInput = document
      .querySelector<HTMLInputElement>("#categories")
      ?.value.trim();
    const categories =
      categoriesInput && categoriesInput.length > 0
        ? categoriesInput
            .split(",")
            .map((cat) => cat.trim())
            .filter((cat) => cat.length > 0)
        : undefined;

    const name =
      document.querySelector<HTMLInputElement>("#name")?.value || undefined;

    const params: TorikiMenuParams = {
      categories,
      name,
    };
    onFilter(params);
  }

  return formHtml;
}
