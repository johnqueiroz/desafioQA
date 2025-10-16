import { expect } from '@playwright/test'
import { test } from '../fixture'
import { users } from '../../utils/users'
import { routes } from '../../utils/routes'

/**
 * Hook executado antes de cada teste.
 * Realiza o acesso à página e login com usuário padrão.
 */

test.beforeEach(
  'Acessar página do saucedemo e fazer login',
  async ({ loginPage, page }) => {
    await loginPage.visit()
    await loginPage.doLogin(users.standard, 'secret_sauce')
    await expect(page).toHaveURL(routes.inventory)
  },
)

test.describe('Fluxo de filtrar produtos', () => {
  /**
   * Array contendo os filtros disponíveis e seus valores esperados.
   */
  const filters = [
    { filter: 'Name A - Z', value: 'az' },
    { filter: 'Name Z - A', value: 'za' },
    { filter: 'Price Low to High', value: 'lohi' },
    { filter: 'Price High to Low', value: 'hilo' },
  ]

  /**
   * Testes parametrizados que validam cada tipo de filtro disponível.
   * Verifica se o filtro selecionado é aplicado corretamente.
   */
  for (const { filter, value } of filters) {
    test(
      `deve validar filtro de produtos - filtro ${filter}`,
      {},
      async ({ productsPage }) => {
        await productsPage.sortFilter(value)
        await expect(productsPage.productFilter).toHaveValue(value)
      },
    )
  }

  /**
   * Hook executado após cada teste.
   * Realiza logout e valida redirecionamento para a página de login.
   */
  test.afterEach(
    'Fazer logout da página do saucedemo',
    async ({ sideBar, page }) => {
      await sideBar.clickMenuItem('Logout')
      await expect(page).toHaveURL(routes.login)
    },
  )
})
