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
  /**
   * Testes parametrizados que validam a adição de cada produto ao carrinho.
   * Itera pelos 6 produtos e verifica o fluxo até a página de checkout.
   */
  for (let index = 0; index < 6; index++) {
    test(
      `deve adicionar produto ao carrinho e seguir ao checkout - ${productsData[index].title}`,
      {},
      async ({ cartPage, productItemPage, productsPage, page }) => {
        /**
         * Etapa 1: Acessa a página do produto específico e adiciona ao carrinho.
         * Valida a URL do produto e a navegação para o carrinho.
         */
        await test.step(`acessar página do produto e adicionar ao carrinho`, async () => {
          await productsPage.clickProduct(index)
          await expect(page).toHaveURL(routes.product(index))

          await productItemPage.addProductToCart()

          await productItemPage.cart.click()
          await expect(page).toHaveURL(routes.cart)
        })

        /**
         * Etapa 2: Valida as informações do produto no carrinho.
         * Verifica os dados do produto e navega para a página de checkout.
         */
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
