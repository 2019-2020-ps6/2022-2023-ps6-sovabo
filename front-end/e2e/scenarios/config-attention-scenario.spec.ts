import { test, expect } from '@playwright/test';
import {configAttention} from 'e2e/e2e.config';
import { ConfigVisionFixture } from 'src/app/config/config-vision/config-vision.fixture'
import {timeout} from "rxjs";
import {AccueilFixture} from "../../src/app/accueil/accueil-fixture";
import {ConfigAttentionComponent} from "../../src/app/config/config-attention/config-attention.component";
import {ConfigAttentionFixture} from "../../src/app/config/config-attention/config-attention.fixture";

// https://playwright.dev/docs/locators
test.describe('configAttention', () => {
  test('[CONTRAST COLOR] Test', async({page}) =>{
    await test.step('[ACTION] Set Contrast Color', async () => {
      let cvf = new ConfigAttentionFixture(page);
      await page.goto(configAttention);
      // Sélecteur CSS pour le bouton
      const contrastButton = 'app-btn-on-off-contrast>button';
      await page.click(contrastButton);

      await page.evaluate(async() => {
        await new Promise(function(resolve) {
          setTimeout(resolve, 2000)
        });
      });

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

      expect(backGroundContainer).toMatch("rgb(200, 200, 200)"||"rgb(150, 150, 150)"||"rgb(128, 90, 208)");
      expect(colorTextShadow).toMatch("black");
      expect(titleColor).toMatch("whitesmoke");

      await page.click(contrastButton);
      //expect(textShadowTextContrasted).toMatch("");
    });
  });
});


