import { expect } from '@playwright/test'
import { test } from '../fixture'
import { users } from '../../utils/users'
import { routes } from '../../utils/routes'

/**
 * Mensagens de erro esperadas durante o fluxo de login.
 */
const dataErros = {
  locked: 'Epic sadface: Sorry, this user has been locked out.',
}

/**
 * Hook executado antes de cada teste.
 * Navega até a página inicial de login.
 */
test.beforeEach('Acessar página do saucedemo', async ({ loginPage }) => {
  await loginPage.visit()
})

test.describe('Fluxo de login', () => {
  /**
   * Array contendo os casos de teste para login bem-sucedido.
   */
  const successCases = [
    { username: 'standard', user: users.standard },
    { username: 'problem', user: users.problem },
    { username: 'performance', user: users.performance },
    { username: 'error', user: users.error },
    { username: 'visual', user: users.visual },
  ]

  /**
   * Testes parametrizados que validam login bem-sucedido para diferentes tipos de usuários.
   * Verifica se após o login o usuário é redirecionado para a página de produtos.
   */
  for (const { username, user } of successCases) {
    test(
      `deve validar o fluxo de login com sucesso - user ${username}`,
      {},
      async ({ loginPage, page }) => {
        await loginPage.doLogin(user, 'secret_sauce')
        await expect(page).toHaveURL(routes.inventory)
      },
    )
  }

  /**
   * Testa o cenário de falha de login para usuário bloqueado.
   * Valida que a mensagem de erro apropriada é exibida.
   */
  test(
    'deve validar o fluxo de login para user locked out',
    {},
    async ({ loginPage }) => {
      await loginPage.doLogin(users.locked, 'secret_sauce')
      await expect(loginPage.lockedError).toContainText(dataErros.locked)
    },
  )

  /**
   * Hook executado após cada teste.
   * Realiza logout apenas se o usuário estiver autenticado (não estiver na página de login).
   * Valida redirecionamento para a página de login após logout.
   */
  test.afterEach(
    'Fazer logout da página do saucedemo',
    async ({ sideBar, page }) => {
      const url = new URL(page.url())
      if (!url.pathname.startsWith(routes.login)) {
        await sideBar.clickMenuItem('Logout')
        await expect(page).toHaveURL(routes.login)
      }
    },
  )
})
