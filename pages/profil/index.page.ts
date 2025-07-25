import type { Locator, Page } from "@playwright/test";
import { BasePage } from "@/pages/base.page";

export class ProfilePage extends BasePage {
  private readonly lastNameInput: Locator;
  private readonly firstNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly updatePictureButton: Locator;
  private readonly modaleUpdatePicture: Locator;
  private readonly fileInput: Locator;
  private readonly confirmUploadButton: Locator;
  private readonly saveProfileButton: Locator;

  constructor(page: Page) {
    super(page);

    this.lastNameInput = this.page.locator('[name="lastName"]');
    this.firstNameInput = this.page.locator('[name="firstName"]');
    this.emailInput = this.page.locator('[name="email"]');
    this.updatePictureButton = this.page.locator(
      '.col-start-1 [data-testid="icon"]'
    );
    this.modaleUpdatePicture = this.page.locator('.container [role="dialog"]');
    this.fileInput = this.page.locator('input[type="file"]');
    this.confirmUploadButton = this.page.locator(".footer-modal .btn-primary");
    this.saveProfileButton = this.page.locator("button.text-white");
  }

  /**
   * Gets the value of the last name input field.
   * @returns
   */
  getLastName(): Promise<string | null> {
    return this.lastNameInput.inputValue();
  }

  /**
   * Gets the value of the first name input field.
   * @returns
   */
  getFirstName(): Promise<string | null> {
    return this.firstNameInput.inputValue();
  }

  /**
   * Gets the value of the email input field.
   * @returns
   */
  getEmail(): Promise<string | null> {
    return this.emailInput.inputValue();
  }

  /**
   * Clicks the button to open the profile picture update modal.
   */
  async updatePicture(): Promise<void> {
    await this.updatePictureButton.click();
  }

  /**
   * Uploads a new profile picture from the given file path.
   * @param imagePath
   */
  async uploadPicture(imagePath: string): Promise<void> {
    await this.fileInput.waitFor({ state: "attached" });
    await this.fileInput.setInputFiles(imagePath);
  }

  /**
   * Checks if the profile picture update modal is visible or hidden.
   * @param visible
   * @returns
   */
  async isModalVisible(visible: boolean = true): Promise<boolean> {
    await this.modaleUpdatePicture.waitFor({
      state: visible ? "visible" : "hidden",
    });
    return this.modaleUpdatePicture.isVisible();
  }

  /**
   * Confirms the profile picture upload by clicking the confirmation button.
   */
  async confirmPictureUpload(): Promise<void> {
    await this.confirmUploadButton.click();
  }

  /**
   * Saves the profile with the current changes.
   */
  async saveProfile(): Promise<void> {
    await this.saveProfileButton.click();
  }
}
