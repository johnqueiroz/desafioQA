export class SideBar {

  constructor(page) {
    this.page = page 

    this.menu = this.page.getByRole('button', { name: 'Open Menu' })
    
    this.searchButtons = {
        AllItems: page.locator('[data-test="inventory-sidebar-link"]'),
        About: page.locator('[data-test="about-sidebar-link"]'),
        Logout: page.locator('[data-test="logout-sidebar-link"]'),
        ResetAppState: page.locator('[data-test="reset-sidebar-link"]'),
    }
  }

  async clickMenuItem(menuText) {
    await this.menu.click()
    await this.searchButtons[menuText].click() 
  }
}
