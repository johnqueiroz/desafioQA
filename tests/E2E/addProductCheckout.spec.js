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
      `deve adicionar produto ao carrinho e seguir ao checkout - ${productsData[index].title}`,
      {},
      async ({ cartPage, productItemPage, productsPage, page }) => {
        await test.step(`acessar página do produto e adicionar ao carrinho`, async () => {
          await productsPage.clickProduct(index)
          await expect(page).toHaveURL(routes.product(index))

          await productItemPage.addProductToCart()

          await productItemPage.cart.click()
          await expect(page).toHaveURL(routes.cart)
        })

        await test.step(`validar carrinho e seguir para checkout`, async () => {
          await expect(cartPage.cartTile).toHaveText('Your Cart')

          await cartPage.validateCart(index)
          await cartPage.checkout.click()
          await expect(page).toHaveURL(routes.checkout)
        })
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
