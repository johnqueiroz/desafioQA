import { expect } from '@playwright/test'
import { test } from '../fixture'
import { users } from '../../utils/users'
import { routes } from '../../utils/routes'

test.beforeEach(
  'Acessar página do saucedemo e fazer login',
  async ({ loginPage, page }) => {
    await loginPage.visit()
    await loginPage.doLogin(users.standard, 'secret_sauce')
    await expect(page).toHaveURL(routes.inventory)
  },
)

test.describe('Fluxo de filtrar produtos', () => {
  const filters = [
    { filter: 'Name A - Z', value: 'az' },
    { filter: 'Name Z - A', value: 'za' },
    { filter: 'Price Low to High', value: 'lohi' },
    { filter: 'Price High to Low', value: 'hilo' },
  ]

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
   * Limpeza após cada teste
   */
  test.afterEach(
    'Fazer logout da página do saucedemo',
    async ({ sideBar, page }) => {
      await sideBar.clickMenuItem('Logout')
      await expect(page).toHaveURL(routes.login)
    },
  )
})
