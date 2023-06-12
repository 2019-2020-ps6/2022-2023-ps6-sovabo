import { test } from '@playwright/test';
import { JouerQuizzFixture } from '../../src/app/quizz/jouer-quizz/jouer-quizz-fixture';

test('has title', async ({ page }) => {
    const fixture = new JouerQuizzFixture(page);
    await fixture.gotoQuizPage('fa9112c9-743c-4ba7-ac7f-2f0569b79609');
  
    // Vérifier si le titre contient "PolyQuiz".
    await fixture.verifyTitleContains('PolyQuiz');
  });
