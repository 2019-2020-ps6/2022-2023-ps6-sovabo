import { test, expect } from '@playwright/test';
import {configVisionUrl, testUrl, accueilUrl, serverUrl, profilUrl} from 'e2e/e2e.config';
import { ConfigVisionFixture } from 'src/app/config/config-vision/config-vision.fixture'
import {async, timeout} from "rxjs";
import { MonProfilFixture } from "../../src/app/mon-profil/mon-profil.fixture";
import { AccessCodeModalFixture } from "../../src/app/access-code-modal/access-code-modal.fixture";
import { JouerQuizzFixture } from '../../src/app/quizz/jouer-quizz/jouer-quizz.fixture';



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

    test('[PROFIL]', async ({page}) => {
        let monProfilFixture = new MonProfilFixture(page);
        await page.goto(profilUrl);
        await test.step('[ACTION] RENTRER CODE ACCEES', async () => {
          const accessCodeFixture = new AccessCodeModalFixture(page);
          await accessCodeFixture.getAccessCodeInput();
        });
        await test.step('[CHECK] CONCORDANCE PAGE PROFILS', async () => {
          const title = await monProfilFixture.getTitle();
          const buttonCreer = await monProfilFixture.getCreerButton();
          const buttonSupprimer = await monProfilFixture.getBtnDeleteUser();
          const buttonRetour = await monProfilFixture.getBtnRetour();
    
          expect(title).toBeVisible();
          expect(buttonCreer).toBeVisible();
          expect(buttonSupprimer).toBeVisible();
          expect(buttonRetour).toBeVisible();
        });
        await test.step('[ACTION] CREER PROFIL', async () => {
          const buttonCreer = await monProfilFixture.getCreerButton();
          await page.click('text=CREER PROFIL');
    
          const buttonAnnuler = await monProfilFixture.getBtnAnnulerCreation();
          await buttonAnnuler.click();
    
          const card = await monProfilFixture.getCardCreatingUser()
          await page.waitForSelector('.creating-card', {state: 'detached'});
          expect(card).not.toBeVisible();
    
          await buttonCreer.click();
          expect(card).toBeVisible();
        });
        await test.step('[ACTION] RENSEIGNER NOM ET ANIMATEUR PROFIL', async () => {
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
        await test.step('[CHECK] NOUVEAU PROFIL CREER', async () => {
          const cardToChoose = await monProfilFixture.getCardFromUser('Emily Bronta');
          expect(cardToChoose).toBeVisible();
        });
        await test.step('[ACTION] SELECTIONNER PROFIL', async () => {
          const cardToChoose = await monProfilFixture.getCardFromUser('Emily Bronta');
          const choisirBtn = await monProfilFixture.getChoisirButtonFromUser(cardToChoose);
          await choisirBtn.click();
        });
        await test.step('[CHECK] PROFIL SELECTIONNÉ', async () => {
          const cardToChoose = await monProfilFixture.getCardFromUser('Emily Bronta');
          const classes = await cardToChoose.getAttribute('class');
          expect(classes?.split(' ')).toContain('selected');
        });
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

            let buttonAnimationOn = 'app-btn-on-off-animations>button';
            await 
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
    test('[CREER-QUIZZ]',async({page})=>{
        test.step('[CHECK] VERIFIER BON FONCTIONNEMENT BOUTONS', async()=>{
            await page.goto(creationQuizUrl);

    const creerQuizFixture = new CreerQuizFixture(page);
    await expect(page).toHaveURL("http://localhost:4200/creer-quizz");

    const accessCodeModalFixture = new AccessCodeModalFixture(page);

    await accessCodeModalFixture.getAccessCodeInput();

    await test.step('Bouton retour fonctionnel', async () => {
      const buttonRetour = await creerQuizFixture.getButtonRetour();
      await expect(buttonRetour).toBeVisible();

      await creerQuizFixture.clickButtonRetour();
      await expect(page).toHaveURL("http://localhost:4200/liste-quizz")

      await page.goto(creationQuizUrl);
      const accessCodeModalFixture = new AccessCodeModalFixture(page);

      await accessCodeModalFixture.getAccessCodeInput();
    });
        });
        test.step('[ACTION] RENSEIGNER QUESTION', async()=>{});
        //....
     });

    test('[ACCUEIL-QUIZZ]',async({page})=>{ });
    test('[JOUER-QUIZZ]',async({page})=>{
      let urlListQuiz = serverUrl+'liste-quizz';
        await page.goto(urlListQuiz);
        const quizElement = await page.$('.quiz');
        
        if (quizElement) { // Ajoutez cette vérification
            await quizElement.click();

            // Maintenant, nous sommes sur la page 'accueil-quiz'
            await page.waitForSelector('.btnJouer');
            const jouerButton = await page.$('.btnJouer');

            if (jouerButton) { // Ajoutez cette vérification
                await jouerButton.click();

                // Maintenant, nous sommes sur la page 'jouer-quizz'
                let urlJouer = page.url();

                //create all fixtures
                const jouerQuizzFixture = new JouerQuizzFixture(page,"fa9112c9-743c-4ba7-ac7f-2f0569b79609");

                await expect(page).toHaveURL(urlJouer);

                await test.step(`Questions et buble visibles`, async () => {
                    const questionBubble = await jouerQuizzFixture.getQuestionBubble();
                    const isVisible = await questionBubble.isVisible();
                    expect(isVisible).toBeTruthy();
                });

                await test.step(`Questions text visible and not empty`, async () => {
                    await page.waitForSelector('#question-animation', { state: 'visible' });

                    
                    const questionText = await jouerQuizzFixture.getQuestionText();
                    const isVisible = await questionText.isVisible();

                    const elementHandle = await questionText.elementHandle();
                    let innerText = null;
                    if (elementHandle !== null) {
                        innerText = await page.evaluate(el => el.textContent, elementHandle);
                    }
                    expect(isVisible).toBeTruthy();
                    expect(innerText).toBeTruthy();
                });

                await test.step(`Answer buttons are visible`, async () => {
                    const answerButtons = await jouerQuizzFixture.getAnswerButtons().elementHandles();
                    for(const button of answerButtons){
                      expect(await button.isVisible()).toBeTruthy();
                    }
                  });


                await test.step(`Validate button is visible`, async () => {
                    const validateButton = await jouerQuizzFixture.getValidateButton();
                    expect(await validateButton.isVisible()).toBeTruthy();
                });

                await test.step(`Quiz title should be not empty`, async () => {
                    const title = await jouerQuizzFixture.getQuizTitle();
                    expect(title).toBeTruthy();
                });

                await test.step(`Timer should be visible and not empty`, async () => {
                    const timer = await jouerQuizzFixture.getTimer();
                    expect(timer).toBeTruthy();
                });


                await test.step(`Select an answer and validate`, async () => {
                    const selectButton = await jouerQuizzFixture.selectAnswerByIndexAndClick(2);
                    expect(selectButton.nth(1)).toBeVisible();
                    const validateButton = await jouerQuizzFixture.getValidateButton();
                    expect(validateButton).toBeVisible();

                    await validateButton.click();

                    const nextButton = await jouerQuizzFixture.getNextQuestionButton();
                    expect(nextButton).toBeVisible();


                    await nextButton.click();

                    const selectButton2 = await jouerQuizzFixture.selectAnswerByIndexAndClick(0);
                    expect(selectButton2.nth(1)).toBeVisible();

                    await validateButton.click();

                    await nextButton.click();


                    const selectButton3 = await jouerQuizzFixture.selectAnswerByIndexAndClick(3);
                    expect(selectButton3.nth(1)).toBeVisible();

                    await validateButton.click();

                    const resultButton = await jouerQuizzFixture.getResultsButton();
                    expect(resultButton).toBeVisible();

                    await resultButton.click();
                });
            } else {
                console.log('Le bouton Jouer n\'a pas été trouvé.');
            }
        } else {
            console.log('Aucune carte de quiz n\'a été trouvée.');
        }


      



     });
    test('[RESULTAT-QUIZZ]',async({page})=>{ });

});
