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

      <div class="row mb-3">
        <div class="col">
          <label for="calorieMin" class="form-label">カロリー最小</label>
          <div class="input-group mb-3">
            <input id="calorieMin" type="number" class="form-control" placeholder="0" />
            <span class="input-group-text">kcal</span>
          </div>
        </div>

        <div class="col">
          <label for="calorieMax" class="form-label">カロリー最大</label>
          <div class="input-group mb-3">
            <input id="calorieMax" type="number" class="form-control" placeholder="0" />
            <span class="input-group-text">kcal</span>
          </div>
        </div>

        <div class="col">
          <label for="saltMin" class="form-label">塩分最小</label>
          <div class="input-group mb-3">
            <input id="saltMin" type="number" class="form-control" placeholder="0" />
            <span class="input-group-text">g</span>
          </div>
        </div>

        <div class="col">
          <label for="saltMax" class="form-label">塩分最大</label>
          <div class="input-group mb-3">
            <input id="saltMax" type="number" class="form-control" placeholder="0" />
            <span class="input-group-text">g</span>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="excludedLimitedQuantity">
            <label class="form-check-label" for="excludedLimitedQuantity">数量限定メニューを除く</label>
          </div>
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
    const caloriesMin =
      document.querySelector<HTMLInputElement>("#calorieMin")?.valueAsNumber ||
      undefined;
    const caloriesMax =
      document.querySelector<HTMLInputElement>("#calorieMax")?.valueAsNumber ||
      undefined;
    const saltMin =
      document.querySelector<HTMLInputElement>("#saltMin")?.valueAsNumber ||
      undefined;
    const saltMax =
      document.querySelector<HTMLInputElement>("#saltMax")?.valueAsNumber ||
      undefined;
    const excludedLimitedQuantity =
      document.querySelector<HTMLInputElement>("#excludedLimitedQuantity")
        ?.checked || false;

    const params: TorikiMenuParams = {
      categories,
      name,
      caloriesMin,
      caloriesMax,
      saltMin,
      saltMax,
      excludedLimitedQuantity,
    };
    onFilter(params);
  }

  return formHtml;
}
