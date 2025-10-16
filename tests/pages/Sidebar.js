export class SideBar {
  constructor(page) {
    this.page = page

    this.menu = this.page.getByRole('button', { name: 'Open Menu' })

    /**
     * Objeto contendo os locators dos itens do menu.
     * @property {Locator} AllItems - Link para visualizar todos os itens
     * @property {Locator} About - Link para a página "Sobre"
     * @property {Locator} Logout - Link para fazer logout
     * @property {Locator} ResetAppState - Link para resetar o estado da aplicação
     */

    this.searchButtons = {
      AllItems: page.locator('[data-test="inventory-sidebar-link"]'),
      About: page.locator('[data-test="about-sidebar-link"]'),
      Logout: page.locator('[data-test="logout-sidebar-link"]'),
      ResetAppState: page.locator('[data-test="reset-sidebar-link"]'),
    }
  }

  /**
   * Abre o menu lateral e clica em um item específico.
   * @param {string} menuText - Nome do item do menu a ser clicado.
   *                            Valores válidos: 'AllItems', 'About', 'Logout', 'ResetAppState'
   * @throws {Error} Se o menuText não corresponder a nenhum item válido
   * @example
   * await sideBar.clickMenuItem('Logout')
   * await sideBar.clickMenuItem('AllItems')
   */

  async clickMenuItem(menuText) {
    await this.menu.click()
    await this.searchButtons[menuText].click()
  }
}
