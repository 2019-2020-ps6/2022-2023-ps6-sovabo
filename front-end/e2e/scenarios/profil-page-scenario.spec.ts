import { test, expect } from "@playwright/test";
import {accueilUrl, profilUrl, testUrl} from "../e2e.config";
import { MonProfilFixture } from "../../src/app/mon-profil/mon-profil.fixture";
import { AccessCodeModalFixture } from "../../src/app/access-code-modal/access-code-modal.fixture";

test.describe('Different tests pour la page profils', () => {

  test('Profil page', async ({ page }) => {
    let monProfilFixture: MonProfilFixture;

    await page.goto(accueilUrl);
    await page.click('text=PROFILS');

    monProfilFixture = new MonProfilFixture(page);
    const accessCodeFixture = new AccessCodeModalFixture(page);

    await expect(page).toHaveURL(testUrl + '/mon-profil');

    await accessCodeFixture.getAccessCodeInput();

    await test.step('Check page', async () => {
      const title = await monProfilFixture.getTitle();
      const buttonCreer = await monProfilFixture.getCreerButton();
      const buttonSupprimer = await monProfilFixture.getBtnDeleteUser();
      const buttonRetour = await monProfilFixture.getBtnRetour();

      expect(title).toBeVisible();
      expect(buttonCreer).toBeVisible();
      expect(buttonSupprimer).toBeVisible();
      expect(buttonRetour).toBeVisible();
    });


    await test.step('Création profil', async () => {
      const buttonCreer = await monProfilFixture.getCreerButton();
      await page.click('text=CREER PROFIL');

      const buttonAnnuler = await monProfilFixture.getBtnAnnulerCreation();
      await buttonAnnuler.click();

      const card = await monProfilFixture.getCardCreatingUser()
      await page.waitForSelector('.creating-card', { state: 'detached' });
      expect(card).not.toBeVisible();

      await buttonCreer.click();
      expect(card).toBeVisible();

      const inputNom = await monProfilFixture.getInputNom();
      await inputNom?.fill('Test');
      expect(await inputNom?.inputValue()).toBe('Test');

      const userSVG = await monProfilFixture.getUserSVG();
      await userSVG.click();
      expect(await page.isVisible('.selectAvatar')).toBe(true);
      await monProfilFixture.closeModalAvatar();
      expect(await page.isVisible('.selectAvatar')).toBe(false);
      await userSVG.click();
      expect(await page.isVisible('.selectAvatar')).toBe(true);
      await monProfilFixture.modifyAvatar();
      expect(await page.isVisible('.selectAvatar')).toBe(false);
      await expect(page.locator('.creating-card .avatarUser')).toHaveAttribute('src', '../../assets/Images/Animateurs/bear/bear-emoji-normal.png.png');

      const buttonValider = await monProfilFixture.getBtnValider();
      await buttonValider.click();
    });

    await test.step('Modifier profil', async () => {
      const cardToChoose = await monProfilFixture.getCardFromUser('Test');

      const userAvatarSVG = await cardToChoose.locator('.user-svg').nth(0);
      await userAvatarSVG.click();
      expect(await page.isVisible('.modifyAvatar')).toBe(true);
      await monProfilFixture.closeModalAvatar();
      expect(await page.isVisible('.modifyAvatar')).toBe(false);
      await userAvatarSVG.click();
      expect(await page.isVisible('.modifyAvatar')).toBe(true);
      await monProfilFixture.modifyAvatar();
      expect(await page.isVisible('.modifyAvatar')).toBe(false);

      const usernameSVG = await cardToChoose.locator('.edit-button');
      await usernameSVG.click();
      const inputNom = await monProfilFixture.getInputNom();
      expect(await inputNom?.inputValue()).toBe('Test');
      await inputNom?.fill('Test2');
      const buttonValider = await monProfilFixture.getBtnValider();
      await buttonValider.click();
      expect(await cardToChoose.getByRole('heading', { name: 'Test2' })).toBeVisible();
    });


    await test.step('Choisir profil', async () => {
      const cardToChoose = await monProfilFixture.getCardFromUser('Test');
      const choisirBtn = await monProfilFixture.getChoisirButtonFromUser(cardToChoose);
      await choisirBtn.click();
      const classes = await cardToChoose.getAttribute('class');
      expect(classes?.split(' ')).toContain('selected');
    });


    await test.step('Suppression profil', async () => {
      const buttonSupprimer = await monProfilFixture.getBtnDeleteUser();
      await buttonSupprimer.click();
      expect(await page.isVisible('.card-delete-mode')).toBe(true);

      const cardToDelete = await monProfilFixture.getCardFromUser('Test');
      await cardToDelete.click();
      expect(cardToDelete).not.toBeVisible();

      const buttonAnnulerSuppression = await monProfilFixture.getBtnAnnulerSuppression();
      await buttonAnnulerSuppression.click();
      expect(await page.isVisible('.card-delete-mode')).toBe(false);
    });


    await test.step('Retour', async () => {
      const buttonRetour = await monProfilFixture.getBtnRetour();
      await buttonRetour.click();
      expect(await page).toHaveURL(accueilUrl);
    });
  });
});
