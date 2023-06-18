import { test, expect } from '@playwright/test';
import { creationQuizUrl } from "../e2e.config";
import { CreerQuizFixture } from '../../src/app/quizz/creer-quizz/creer-quizz.fixture';
import { AccessCodeModalFixture } from '../../src/app/access-code-modal/access-code-modal.fixture';

test.describe('Test de création de quiz', () => {

  test('Fonctionnalité de bases de la page', async ({ page }) => {
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

    await test.step('Bouton home fonctionnel', async () => {
      const homeButton = await creerQuizFixture.getHomeButton();
      await expect(homeButton).toBeVisible();

      await creerQuizFixture.clickHomeButton();
      await expect(page).toHaveURL("http://localhost:4200/accueil")
    });

  });

  test("Remplissage et création d'un quiz classique", async ({ page }) => {
    await page.goto(creationQuizUrl);

    const creerQuizFixture = new CreerQuizFixture(page);
    const accessCodeModalFixture = new AccessCodeModalFixture(page);

    await accessCodeModalFixture.getAccessCodeInput();

    await test.step('Remplir quiz', async () => {
      const messageErreur = await creerQuizFixture.getMessageErreur();
      await creerQuizFixture.clickButtonValider();
      await page.waitForSelector('.alert-danger', { state: 'attached' });
      await expect(messageErreur).toBeVisible();
      await expect(page).toHaveURL("http://localhost:4200/creer-quizz")

      const titreQuiz = await creerQuizFixture.getTitreQuiz();
      await titreQuiz.type('Quiz de test');

      const descriptionQuiz = await creerQuizFixture.getDescriptionQuiz();
      await descriptionQuiz.type('Ceci est la description du quiz');

      const imageQuizPromise = page.waitForEvent('filechooser');
      await creerQuizFixture.clickImageQuiz();
      const imageQuizFileChooser = await imageQuizPromise;
      await imageQuizFileChooser.setFiles('src/assets/Images/home-3-fill.png');

      const difficultyBar = await creerQuizFixture.getDifficultyBar();
      await difficultyBar[2].click();

      let listeQuestions = await creerQuizFixture.getQuestionsQuiz();
      for(let i = 0; i < 4; i++) {
        if(listeQuestions[i] == null) {
          await creerQuizFixture.clickButtonAddQuestion();
          listeQuestions = await creerQuizFixture.getQuestionsQuiz();
        }
        await listeQuestions[i].type('Ceci est la question ' + (i + 1));
        for(let j = 0; j < 3; j++) {
          let reponse = await creerQuizFixture.getUniqueReponsesQuiz(i, j);
          if(!await reponse.isVisible()) {
            await creerQuizFixture.clickButtonAddReponse(i);
            reponse = await creerQuizFixture.getUniqueReponsesQuiz(i, j);
          }
          await reponse.type('R' + (j + 1) + ' Q' + (i + 1));
        }
        await creerQuizFixture.clickSelectionnerBonneReponse(i, 1);
      }

      const buttonValider = await creerQuizFixture.getButtonValider();
      await expect(buttonValider).toBeVisible();

      await creerQuizFixture.clickButtonValider();
      await expect(page).toHaveURL("http://localhost:4200/liste-quizz")

      const quizCree = await page.getByText('Quiz de test');
      await expect(quizCree).toBeVisible();

      await page.click('text=Quiz de test');
      await page.click('text=Modifier le quiz');

      const accessCodeModalFixture = new AccessCodeModalFixture(page);
      await accessCodeModalFixture.getAccessCodeInput();

      await page.click('text=SUPPRIMER');

      await expect(page).toHaveURL("http://localhost:4200/liste-quizz");
    });

    await test.step('Bouton home fonctionnel', async () => {

    });

  });
});
