import { routes } from "../../utils/routes"

export class ProductsPage {
    constructor(page){
        this.page = page

        this.productFilter = page.locator('[data-test="product-sort-container"]')
    }

  /**
   * Navega para a página de produtos
   */
    async visit() {
      await this.page.goto(routes.inventory)
    }

  /**
   * Ordena produtos por critério
   * @param {'az' | 'za' | 'lohi' | 'hilo'} sortType - Tipo de ordenação
   * - 'az': Nome (A para Z)
   * - 'za': Nome (Z para A)
   * - 'lohi': Preço (menor para maior)
   * - 'hilo': Preço (maior para menor)
   */
  async sortFilter(sortType) {
    await this.productFilter.selectOption(sortType)
  }

  /**
   * Retorna o locator de um produto específico pelo índice
   * @param {number} index - Índice do produto (0-5)
   * @returns {Locator} Locator do produto
   */
  async clickProduct(index) {
    return this.page.locator(`[data-test="item-${index}-title-link"]`).click()
  }
}