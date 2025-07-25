import type { Locator, Page } from "@playwright/test";
import { BasePage } from "@/pages/base.page";

export class LogInPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    this.emailInput = this.page.locator("#username");
    this.passwordInput = this.page.locator("#password");
    this.loginButton = this.page.locator(".btn.btn-primary");
  }

  /**
   * Logs in to application
   * @param user
   */
  async logIn(user: UserData): Promise<void> {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
