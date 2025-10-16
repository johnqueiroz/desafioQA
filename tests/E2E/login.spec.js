import { expect } from '@playwright/test'
import { test } from '../fixture'
import { users } from '../../utils/users'
import { routes } from '../../utils/routes'

const dataErros = {
  locked: 'Epic sadface: Sorry, this user has been locked out.',
}

test.beforeEach('Acessar página do saucedemo', async ({ loginPage }) => {
  await loginPage.visit()
})

test.describe('Fluxo de login', () => {

  const successCases = [
    { username: 'standard', user: users.standard },
    { username: 'problem', user: users.problem },
    { username: 'performance', user: users.performance },
    { username: 'error', user: users.error },
    { username: 'visual', user: users.visual },
  ]

  for (const { username, user } of successCases) {
    test(`deve validar o fluxo de login com sucesso - user ${username}`, {
    }, async ({ loginPage, page }) => {
      await loginPage.doLogin(user, 'secret_sauce')
      await expect(page).toHaveURL(routes.inventory)
    })
  }

  test('deve validar o fluxo de login para user locked out', {
  }, async ({ loginPage }) => {
    await loginPage.doLogin(users.locked, 'secret_sauce')
    await expect(loginPage.lockedError).toContainText(dataErros.locked)
  })

  /**
  * Limpeza após cada teste
  */
  test.afterEach('Fazer logout da página do saucedemo', async ({ sideBar, page }) => {
    const url = new URL(page.url())
    if(!url.pathname.startsWith(routes.login)){
      await sideBar.clickMenuItem('Logout')
      await expect(page).toHaveURL(routes.login)
    }
  })
})
