import { test, expect } from '@playwright/test';

import { JouerQuizzFixture } from '../../src/app/quizz/jouer-quizz/jouer-quizz.fixture';
import { serverUrl } from '../e2e.config';

test.describe('Jouer Quizz', () => {

    test('lancement de la page jouer quizz', async ({ page }) => {
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
                    await page.waitForTimeout(2000); // Attend 2 secondes
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
            } else {
                console.log('Le bouton Jouer n\'a pas été trouvé.');
            }
        } else {
            console.log('Aucune carte de quiz n\'a été trouvée.');
        }
    });
});




        // await test.step(`Questions text visible and not empty`, async () => {
        //     const questionText = await jouerQuizzFixture.getQuestionText();
        //     const isVisible = await questionText.isVisible();
        //     const innerText = await questionText.innerText();
        //     expect(isVisible).toBeTruthy();
        //     expect(innerText).toBeTruthy();
        // });

    //     await test.step(`Answer buttons are visible`, async () => {
    //         const answerButtons = await jouerQuizzFixture.getAnswerButtons().elementHandles();
    //         for(const button of answerButtons){
    //           expect(await button.isVisible()).toBeTruthy();
    //         }
    //       });

    //     await test.step(`Validate button is visible`, async () => {
    //         const validateButton = await jouerQuizzFixture.getValidateButton();
    //         expect(await validateButton.isVisible()).toBeTruthy();
    //     });

    //     // Scénario de test

    //     await test.step(`Quiz title should be not empty`, async () => {
    //         const title = await jouerQuizzFixture.getQuizTitle();
    //         expect(title).toBeTruthy();
    //     });
        
    //     await test.step(`Timer should be visible and not empty`, async () => {
    //         const timer = await jouerQuizzFixture.getTimer();
    //         expect(timer).toBeTruthy();
    //     });
        
    //     await test.step(`Select an answer and validate`, async () => {
    //         await jouerQuizzFixture.selectAnswerByIndex(0);
    //         const validateButton = await jouerQuizzFixture.getValidateButton();
    //         await validateButton.click();
    //     });
        
    //     await test.step(`Next question button should be enabled`, async () => {
    //         const isDisabled = await jouerQuizzFixture.getNextButtonDisabledStatus();
    //         expect(isDisabled).toBeFalsy();
    //     });
    // });