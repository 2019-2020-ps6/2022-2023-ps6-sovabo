import { test, expect } from '@playwright/test';
import {configVisionUrl, testUrl} from 'e2e/e2e.config';
import { ConfigVisionFixture } from 'src/app/config/config-vision/config-vision.fixture'

// https://playwright.dev/docs/locators
test.describe('configVision page display', () => {
  test('Jeux De Couleur Test', async ({ page }) => {
    await test.step('Default Theme', await() => {

    });
    let cvf = new ConfigVisionFixture(page);
    await page.goto(configVisionUrl);
    // Sélecteur CSS pour le bouton

    const bouton = '#DEUTERANOMALIE>button';

    // Vérification du style initial de l'élément cible
    var styleInitial = await page.$eval(bouton, function (el) {
      return getComputedStyle(el).backgroundImage
    });
    expect(styleInitial).toBe('linear-gradient(261.58deg, rgba(178, 0, 0, 0.5) -77.61%, rgba(124, 101, 169, 0.5) 143.35%)');

    await page.close();
  });
});
