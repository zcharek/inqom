import type { Page } from "@playwright/test";

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Goes to log in page
   */
  async goTologinPage(): Promise<void> {
    await this.page.goto("/");
  }
  /**
   * Get Url
   * @returns
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Intercepts json response url's
   * @param route
   * @returns
   */
  async waitForJsonResponse(route: RegExp) {
    return await this.page.waitForResponse((response) => {
      const url = response.url();
      const match = route.test(url);
      return match && response.status() === 200;
    });
  }
}
