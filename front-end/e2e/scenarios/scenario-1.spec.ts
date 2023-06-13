import { test, expect } from '@playwright/test';
import {configVisionUrl, testUrl, accueilUrl} from 'e2e/e2e.config';
import { ConfigVisionFixture } from 'src/app/config/config-vision/config-vision.fixture'
import {async, timeout} from "rxjs";
import { MonProfilFixture } from "../../src/app/mon-profil/mon-profil.fixture";
import { AccessCodeModalFixture } from "../../src/app/access-code-modal/access-code-modal.fixture";


// https://playwright.dev/docs/locators

test.describe('Scenario Complet', () => {
    test('[ACCUEIL]',async({page})=>{
    test.step('[CHECK] CONCORDANCE PAGE ACCUEIL', async()=>{
    
    });
    test.step('[ACTION] CLIQUER PROFIL', async()=>{
        let monProfilFixture: MonProfilFixture;

        await page.goto(accueilUrl);
        await page.click('text=PROFILS');

        monProfilFixture = new MonProfilFixture(page);
        const accessCodeFixture = new AccessCodeModalFixture(page);

        await expect(page).toHaveURL(testUrl + '/mon-profil');

        });
    });

    test('[PROFIL]',async({page})=>{
            let monProfilFixture: MonProfilFixture;

        test.step('[ACTION] RENTRER CODE ACCEES', async()=>{
            const accessCodeFixture = new AccessCodeModalFixture(page);
            await accessCodeFixture.getAccessCodeInput();
        });
        test.step('[CHECK] CONCORDANCE PAGE PROFILS', async()=>{
            const title = await monProfilFixture.getTitle();
            const buttonCreer = await monProfilFixture.getCreerButton();
            const buttonSupprimer = await monProfilFixture.getBtnDeleteUser();
            const buttonRetour = await monProfilFixture.getBtnRetour();

            expect(title).toBeVisible();
            expect(buttonCreer).toBeVisible();
            expect(buttonSupprimer).toBeVisible();
            expect(buttonRetour).toBeVisible();
        });
        test.step('[ACTION] CREER PROFIL', async()=>{
            const buttonCreer = await monProfilFixture.getCreerButton();
            await page.click('text=CREER PROFIL');

            const buttonAnnuler = await monProfilFixture.getBtnAnnulerCreation();
            await buttonAnnuler.click();

            const card = await monProfilFixture.getCardCreatingUser()
            await page.waitForSelector('.creating-card', { state: 'detached' });
            expect(card).not.toBeVisible();

            await buttonCreer.click();
            expect(card).toBeVisible();
        });
        test.step('[ACTION] RENSEIGNER NOM ET ANIMATEUR PROFIL', async()=>{
            const inputNom = await monProfilFixture.getInputNom();
            await inputNom?.fill('Emily Bronta');
            expect(await inputNom?.inputValue()).toBe('Emily Bronta');

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
        test.step('[CHECK] NOUVEAU PROFIL CREER', async()=>{
            const cardToChoose = await monProfilFixture.getCardFromUser('Emily Bronta');
            expect(cardToChoose).toBeVisible();
        });
        test.step('[ACTION] SELECTIONNER PROFIL', async()=>{
            const cardToChoose = await monProfilFixture.getCardFromUser('Emily Bronta');
            const choisirBtn = await monProfilFixture.getChoisirButtonFromUser(cardToChoose);
            await choisirBtn.click();
        });
        test.step('[CHECK] PROFIL SELECTIONNÉ', async()=>{
            const cardToChoose = await monProfilFixture.getCardFromUser('Emily Bronta');
            const classes = await cardToChoose.getAttribute('class');
            expect(classes?.split(' ')).toContain('selected');
        });
    });
    test('[ACCUEIL]',async({page})=>{
        test.step('[ACTION] CLIQUER CONFIGURATION', async()=>{
    
        });
      });

      //animation --> ON
      //tritanopie --> ON
    test('[CONFIGURATION]',async({page})=>{
        test.step('[ACTION] RENTRER CODE ACCEES', async()=>{
            const accessCodeFixture = new AccessCodeModalFixture(page);
            await accessCodeFixture.getAccessCodeInput();
        });
        test.step('[CHECK] CONCORDANCE PAGE CONFIGURATION', async()=>{});
        test.step('[ACTION] GO TO CONFIGURATION ATTENTION', async()=>{});

    });

    test('[CONFIGURATION-ATTENTION]',async({page})=>{
        test.step('[ACTION] ACTIVER ANIMATION', async()=>{
            let buttonAnimation = 'app-btn-on-off-animations';
            await page.click(buttonAnimation);
            
        });
        test.step('[ACTION] ACTIVER TRITANOPIE', async()=>{
        });
        test.step('[CHECK] TIRTANOPIE IS APPLY', async()=>{
        });
        test.step('[ACTION] CHANGER FONT', async()=>{
        });
        test.step('[CHECK] FONT IS APPLY', async()=>{
        }); 

        test.step('[ACTION] RETOUR x2', async()=>{
        });
    });

    test('[CONFIGURATION-VISION]',async({page})=>{ });
    test('[CONFIGURATION-ATTENTION]',async({page})=>{ });

    test('[ACCUEIL]',async({page})=>{});

    test('[LISTE-QUIZZ]',async({page})=>{ });
    test('[ACCUEIL-QUIZZ]',async({page})=>{ });
    test('[JOUER-QUIZZ]',async({page})=>{ });
    test('[RESULTAT-QUIZZ]',async({page})=>{ });

});
