import { test, expect } from "@playwright/test";
import { LogInPage } from "@/pages/login/index.page";
import { responseUrlsToWait, urlsToWait } from "@/data/urls/waitUrls";
import { DashboardPage } from "@/pages/dashboard/index.page";
import { ProfilePage } from "@/pages/profil/index.page";
import { getUser } from "@/data/fixture/credentiels";
import path from "path";

const user = getUser("cabinet comptable");
const imagePath = "./assets/profil.jpg";

test.describe("Test Suite: Update Profile", () => {
  test("Update profile picture", async ({ page }) => {
    const logInPage = new LogInPage(page);
    const dashboardPage = new DashboardPage(page);
    const profilePage = new ProfilePage(page);

    await test.step("Go to log in page", async () => {
      await logInPage.goTologinPage();
      await expect(page).toHaveTitle(/Inqom/i);
    });

    await test.step("Log in to my account", async () => {
      const responseToWait = logInPage.waitForJsonResponse(
        responseUrlsToWait.dashboard.getEntreprise
      );
      await logInPage.logIn(user);

      const response = await responseToWait;
      expect(logInPage.getUrl()).toContain(urlsToWait.home.entreprise);

      const data = await response.json();
      expect(data).toBeDefined();
      expect(data[0].EnterpriseId).toBe(user.enterpriseId);
      expect(data[0].EnterpriseName).toBe(user.enterpriseName);

      expect(await dashboardPage.getCompanyName()).toContain(
        data[0].EnterpriseName
      );
    });

    await test.step("Go to profile", async () => {
      await dashboardPage.goToMyProfile();
      expect(dashboardPage.getUrl()).toContain(urlsToWait.myAccount.profile);

      const responseToWait = await logInPage.waitForJsonResponse(
        responseUrlsToWait.myAccount.profile
      );
      const data = await responseToWait.json();

      expect(await profilePage.getEmail()).toContain(data.Email);
      expect(await profilePage.getFirstName()).toContain(data.FirstName);
      expect(await profilePage.getLastName()).toContain(data.LastName);
    });

    await test.step("Update picture profile", async () => {
      await profilePage.updatePicture();
      await profilePage.uploadPicture(imagePath);
      expect(await profilePage.isModalVisible()).toBe(true);

      await profilePage.confirmPictureUpload();
      expect(await profilePage.isModalVisible(false)).toBe(false);
    });

    await test.step("Should picture profile updated", async () => {
      await profilePage.saveProfile();

      const responseToWait = await logInPage.waitForJsonResponse(
        responseUrlsToWait.myAccount.profile
      );
      const data = await responseToWait.json();

      const filePrefix = path.basename(imagePath, path.extname(imagePath));
      const fileExt = path.extname(imagePath);
      expect(data.UrlAvatar).toContain(filePrefix);
      expect(data.UrlAvatar).toMatch(new RegExp(`${fileExt}$`));
    });
  });
});
