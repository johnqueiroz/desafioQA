import { expect } from '@playwright/test'
import { test } from '../fixture'
import { users } from '../../utils/users'
import { routes } from '../../utils/routes'
import { generateCheckoutData } from '../../utils/fakerData'

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
   * Testes parametrizados que executam o fluxo completo de compra para cada produto.
   * Itera pelos 6 produtos disponíveis e valida todas as etapas do checkout.
   */
  for (let index = 0; index < 6; index++) {
    test(
      `deve adicionar produto ao carrinho e efetuar compra - ${index}`,
      {},
      async ({
        checkoutCompletePage,
        checkoutFinishPage,
        checkoutPage,
        cartPage,
        productItemPage,
        productsPage,
        page,
      }) => {
        /**
         * Etapa 1: Acessa a página do produto e adiciona ao carrinho.
         * Valida a URL do produto e a adição ao carrinho.
         */
        await test.step(`acessar página do produto e adicionar ao carrinho`, async () => {
          await productsPage.clickProduct(index)
          await expect(page).toHaveURL(routes.product(index))

          await productItemPage.addProductToCart()

          await productItemPage.cart.click()
          await expect(page).toHaveURL(routes.cart)
        })

        /**
         * Etapa 2: Valida o carrinho e prossegue para o checkout.
         * Verifica as informações do produto no carrinho.
         */
        await test.step(`validar carrinho e seguir para checkout`, async () => {
          await expect(cartPage.cartTile).toHaveText('Your Cart')

          await cartPage.validateCart(index)
          await cartPage.checkout.click()
          await expect(page).toHaveURL(routes.checkout)
        })

        /**
         * Etapa 3: Preenche as informações do usuário no checkout.
         * Utiliza dados gerados aleatoriamente via Faker.
         */
        await test.step(`Enviar informações`, async () => {
          await expect(checkoutPage.checkoutTitle).toHaveText(
            'Checkout: Your Information',
          )
          const userData = generateCheckoutData()
          await checkoutPage.sendUserInformation(
            userData.firstName,
            userData.lastName,
            userData.postalCode,
          )
        })

        /**
         * Etapa 4: Valida as informações do pedido e confirma a compra.
         * Verifica todos os detalhes do produto, preços e impostos.
         */
        await test.step(`Validar infos do produto e confirmar compra`, async () => {
          await expect(page).toHaveURL(routes.checkoutFinish)
          await expect(checkoutFinishPage.checkoutFinishTitle).toHaveText(
            'Checkout: Overview',
          )
          await checkoutFinishPage.checkCheckoutInformation(index)
          await checkoutFinishPage.finishButton.click()
        })

        /**
         * Etapa 5: Valida a conclusão do checkout.
         * Verifica que a página de confirmação é exibida corretamente.
         */
        await test.step(`Checkout completo`, async () => {
          await expect(page).toHaveURL(routes.checkoutComplete)
          await expect(checkoutCompletePage.checkoutCompletedTitle).toHaveText(
            'Checkout: Complete!',
          )
          await checkoutCompletePage.checkInformation()
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
