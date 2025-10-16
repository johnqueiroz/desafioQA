import { test as fixture } from '@playwright/test'
import { LoginPage } from './pages/LoginPage'
import { ProductsPage } from './pages/ProductsPage'
import { ProductItemPage } from './pages/ProductItemPage'
import { CartPage } from './pages/CartPage'
import { SideBar } from './pages/Sidebar'
import { CheckoutPage } from './pages/CheckoutPage'
import { CheckoutFinishPage } from './pages/CheckoutFinishPage'
import { CheckoutCompletePage } from './pages/CheckoutCompletePage'

/**
 *
 * @example
 * import { test } from './fixtures'
 *
 * test('deve fazer login com sucesso', async ({ loginPage, productsPage }) => {
 *   await loginPage.navigate()
 *   await loginPage.login('user', 'password')
 *   await productsPage.expectToBeVisible()
 * })
 */

export const test = fixture.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page))
  },
  productItemPage: async ({ page }, use) => {
    await use(new ProductItemPage(page))
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page))
  },
  sideBar: async ({ page }, use) => {
    await use(new SideBar(page))
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page))
  },
  checkoutFinishPage: async ({ page }, use) => {
    await use(new CheckoutFinishPage(page))
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page))
  },
})
export default test
