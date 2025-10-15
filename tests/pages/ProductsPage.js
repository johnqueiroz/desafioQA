import { routes } from "../../utils/routes"

export class ProductsPage {
    constructor(page){
        this.page = page

        this.productFilter = page.locator('[data-test="product-sort-container"]')
    }

    async visit() {
        await this.page.goto(routes.inventory)
    }

  /**
   * Ordena produtos por critério
   * @param {'az' | 'za' | 'lohi' | 'hilo'} sortType - Tipo de ordenação
   * @returns {Promise<void>}
   */
  async sortFilter(sortType) {
    await this.productFilter.selectOption(sortType)
  }
}