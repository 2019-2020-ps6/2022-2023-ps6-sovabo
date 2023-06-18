import { test, expect } from '@playwright/test';
import {configAttentionUrl} from 'e2e/e2e.config';
import { ConfigVisionFixture } from 'src/app/config/config-vision/config-vision.fixture'
import {timeout} from "rxjs";
import {AccueilFixture} from "../../src/app/accueil/accueil-fixture";
import {ConfigAttentionComponent} from "../../src/app/config/config-attention/config-attention.component";
import {ConfigAttentionFixture} from "../../src/app/config/config-attention/config-attention.fixture";

// https://playwright.dev/docs/locators
test.describe('configVision Jeu Couleur', () => {
  test('[DEFAULT COLOR] Test', async({page}) =>{
      await test.step('[CHECK] Default Theme', async () => {
      let cvf = new ConfigVisionFixture(page);
      await page.goto(configAttentionUrl);
      // Sélecteur CSS pour le bouton
      const bouton = 'app-btn-on-off-contrast>button';

      // Vérification du style initial de l'élément cible
      var styleInitial = await page.$eval(bouton, function (el) {
        return getComputedStyle(el).backgroundImage
      });
      expect(styleInitial).toBe('linear-gradient(261.58deg, rgba(178, 0, 0, 0.5) -77.61%, rgba(124, 101, 169, 0.5) 143.35%)');
    });
  });

  test('[CONTRAST COLOR] Test', async({page}) =>{
    await test.step('[ACTION] Set Contrast Color', async () => {
      let cvf = new ConfigAttentionFixture(page);
      await page.goto(configAttentionUrl);
      // Sélecteur CSS pour le bouton
      const contrastButton = 'app-btn-on-off-contrast>button';

      const containersContrasted = ".contrastUpContainer";
      var backGroundContainer = await page.$eval(containersContrasted, function(el){
        return getComputedStyle(el).backgroundColor;
      })

      const textExtrudeContrasted = ".contrastUpTextExtrude";
      var colorTextShadow = await page.$eval(textExtrudeContrasted, function(el){
        return getComputedStyle(el).backgroundColor;
      })
      const titleContrasted = ".contrastUpTitleExtrude";
      var titleColor = await page.$eval(titleContrasted, function(el){
        return getComputedStyle(el).color;
      })
      const textContrasted = ".contrastUpText";
      var textShadowTextContrasted = await page.$eval(textContrasted, function(el){
        return getComputedStyle(el).textShadow;
      })

      expect(backGroundContainer).toMatch("rgb(200, 200, 200)"||"rgb(150, 150, 150)");
      expect(colorTextShadow).toMatch("black");
      expect(titleColor).toMatch("whitesmoke");
      //expect(textShadowTextContrasted).toMatch("");
    });
  });
});


