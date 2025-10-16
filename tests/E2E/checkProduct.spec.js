import { expect } from '@playwright/test'
import { test } from '../fixture'
import { users } from '../../utils/users'
import { routes } from '../../utils/routes'
import { productsData } from '../../utils/products'

test.beforeEach(
  'Acessar página do saucedemo e fazer login',
  async ({ loginPage, page }) => {
    await loginPage.visit()
    await loginPage.doLogin(users.standard, 'secret_sauce')
    await expect(page).toHaveURL(routes.inventory)
  },
)

test.describe('Validar produtos', () => {
  for (let index = 0; index < 6; index++) {
    test(
      `deve validar informações do produto - ${index}`,
      {},
      async ({ productItemPage, productsPage, page }) => {
        await productsPage.clickProduct(index)

        // Validar URL
        await expect(page).toHaveURL(routes.product(index))

        // Validar informações do produto
        await expect(productItemPage.itemName).toHaveText(
          productsData[index].title,
        )
        await expect(productItemPage.itemDescription).toHaveText(
          productsData[index].description,
        )
        await expect(productItemPage.itemPrice).toHaveText(
          productsData[index].price,
        )
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
