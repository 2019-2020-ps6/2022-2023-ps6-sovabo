  import { test, expect } from "@playwright/test";
  import {accueilUrl, profilUrl, testUrl} from "../e2e.config";
  import { MonProfilFixture } from "../../src/app/mon-profil/mon-profil.fixture";
  import { AccessCodeModalFixture } from "../../src/app/access-code-modal/access-code-modal.fixture";
  import {AccueilFixture} from "../../src/app/accueil/accueil.fixture";

  test.describe('Different tests pour la page profils', () => {

    test('Profil page', async ({ page }) => {
      const  monProfilFixture= new MonProfilFixture(page);

      await page.goto(accueilUrl);

      const accessCodeFixture = new AccessCodeModalFixture(page);

      await test.step('Unselect profil if necessary', async () => {
        await page.click('text=PROFILS');
        await accessCodeFixture.getAccessCodeInput();
        await monProfilFixture.unselectProfil();
        await page.click('text=RETOUR');
      });

      await test.step('Configurations et statistiques inaccessibles', async () => {
        const accueilFixture = new AccueilFixture(page);
        await page.click('text=CONFIGURATION');
        const alert = await accueilFixture.getAlert();
        expect(alert).toBeVisible();
        expect(await alert.innerText()).toBe('Aucun profil n\'est sélectionné, veuillez en créer un ou en sélectionner un existant.');
      });


      await test.step('Check page', async () => {
        await page.click('text=PROFILS');


        await expect(page).toHaveURL(testUrl + '/mon-profil');

        await accessCodeFixture.getAccessCodeInput();
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
        await page.click('text=SUPPRIMER PROFIL');
        const alert = await  monProfilFixture.getAlert('Vous ne pouvez pas supprimer un utilisateur en cours de création !', 'danger');
        expect(await alert).toBeVisible();

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

        const alert2 = await  monProfilFixture.getAlert('L\'utilisateur a bien été créé !', 'success');
        await expect(await alert2).toBeVisible();
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
        const alert = await  monProfilFixture.getAlert('L\'avatar a bien été modifié !', 'success');
        await expect(await alert).toBeVisible();
        expect(await page.isVisible('.modifyAvatar')).toBe(false);

        const usernameSVG = await cardToChoose.locator('.edit-button');
        await usernameSVG.click();
        await page.click('text=SUPPRIMER PROFIL');
        const alert2 = await  monProfilFixture.getAlert('Vous ne pouvez pas supprimer un utilisateur en cours de modification !', 'danger');
        await expect(await alert2).toBeVisible();
        const inputNom = await monProfilFixture.getInputNom();
        expect(await inputNom?.inputValue()).toBe('Test');
        await inputNom?.fill('Test2');
        const buttonValider = await monProfilFixture.getBtnValider();
        await buttonValider.click();
        const alert3 = await  monProfilFixture.getAlert('Votre nom a bien été modifié', 'success');
        await expect(await alert3).toBeVisible();
        expect(await cardToChoose.getByRole('heading', { name: 'Test2' })).toBeVisible();
      });


      await test.step('Choisir profil', async () => {
        const cardToChoose = await monProfilFixture.getCardFromUser('Test2');
        const choisirBtn = await monProfilFixture.getChoisirButtonFromUser(cardToChoose);
        await expect(await choisirBtn).toBeVisible();
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
        await expect(cardToDelete).not.toBeVisible();

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
