import type { Locator, Page } from "@playwright/test";
import { BasePage } from "@/pages/base.page";

export class DashboardPage extends BasePage {
  private readonly companyNameBlock: Locator;
  private readonly profileButton: Locator;

  constructor(page: Page) {
    super(page);

    this.companyNameBlock = this.page.locator(
      '[class="truncate text-body/4 font-medium"]'
    );
    this.profileButton = this.page.locator('.border-t [data-testid="avatar"]');
  }

  /**
   * Gets company name
   * @returns
   */
  getCompanyName(): Promise<string | null> {
    return this.companyNameBlock.textContent();
  }

  /**
   * Goes to my profile
   */
  async goToMyProfile(): Promise<void> {
    await this.profileButton.click();
  }
}
