import { test, expect } from '@playwright/test';
import {configVisionUrl, testUrl} from 'e2e/e2e.config';
import { ConfigVisionFixture } from 'src/app/config/config-vision/config-vision.fixture'
import {timeout} from "rxjs";

// https://playwright.dev/docs/locators
test.describe('configVision page display', () => {
  test('Jeux De Couleur Test', async ({ page }) => {
    let cvf = new ConfigVisionFixture(page);
    await test.step('[CHECK] Default Theme', async () => {
      let cvf = new ConfigVisionFixture(page);
      await page.goto(configVisionUrl);
      // Sélecteur CSS pour le bouton
      const bouton = '#DEUTERANOMALIE>button';

      // Vérification du style initial de l'élément cible
      var styleInitial = await page.$eval(bouton, function (el) {
        return getComputedStyle(el).backgroundImage
      });
      expect(styleInitial).toBe('linear-gradient(261.58deg, rgba(178, 0, 0, 0.5) -77.61%, rgba(124, 101, 169, 0.5) 143.35%)');

    });

    await test.step('[ACTION] Change Style to DEUTERANOMALIE', async () =>{
      //ON CHANGE LE STYLE EN DEUTERANOMALIE
      await page.goto(configVisionUrl);
      // Sélecteur CSS pour le bouton
      const boutonDEUTERANOMALIE = '#DEUTERANOMALIE>button';

      //on clique sur le bouton
      await page.click(boutonDEUTERANOMALIE, {timeout: 2000});
    });

    await test.step('[CHECK] Check Changes BTN Color', async () =>{
      const boutonsColor = 'app-btn-on-off-colors>button';
      const boutonsFont = 'app-btn-font>button';
      const boutonsClickableBackground = 'app-btn-clickable-background>button';
      const boutonsClickableFrameBackground = 'app-btn-clickable-frame-background>button';

      var styleDeuteranomalie_btn_color = await page.$eval(boutonsColor, function (el){
        return getComputedStyle(el).backgroundColor;
      });

      var styleDeuteranomalie_btn_font = await page.$eval(boutonsFont, function (el){
        return getComputedStyle(el).backgroundColor;
      });

      var styleDeuteranomalie_btn_background = await page.$eval(boutonsClickableBackground, function(el){
        return getComputedStyle(el).backgroundColor;
      });

      var styleDeuteranomalie_btn_frame_background = await page.$eval(boutonsClickableFrameBackground, function(el){
        return getComputedStyle(el).backgroundColor;
      });

      expect(styleDeuteranomalie_btn_color).toBe(cvf.getDeuteranomalieColorBtn());expect(styleDeuteranomalie_btn_font).toBe(cvf.getDeuteranomalieColorBtn());
      expect(styleDeuteranomalie_btn_background).toBe(cvf.getDeuteranomalieColorBtn());
      expect(styleDeuteranomalie_btn_frame_background).toBe(cvf.getDeuteranomalieColorBtn());
    });

    await test.step('[CHECK] Check Changes BTN Text Style', async () =>{
      const boutonsColor = 'app-btn-on-off-colors>button';
      const boutonsFont = 'app-btn-font>button';
      const boutonsClickableBackground = 'app-btn-clickable-background>button';
      const boutonsClickableFrameBackground = 'app-btn-clickable-frame-background>button';

      var styleDeuteranomalie_btn_color = await page.$eval(boutonsColor, function (el){
        return getComputedStyle(el).textShadow;
      });

      var styleDeuteranomalie_btn_font = await page.$eval(boutonsFont, function (el){
        return getComputedStyle(el).textShadow;
      });

      var styleDeuteranomalie_btn_background = await page.$eval(boutonsClickableBackground, function(el){
        return getComputedStyle(el).textShadow;
      });

      var styleDeuteranomalie_btn_frame_background = await page.$eval(boutonsClickableFrameBackground, function(el){
        return getComputedStyle(el).textShadow;
      });

      expect(styleDeuteranomalie_btn_color).toBe(cvf.getDeuteranomalieLabelTextShadow());expect(styleDeuteranomalie_btn_font).toBe(cvf.getDeuteranomalieLabelTextShadow());
      expect(styleDeuteranomalie_btn_background).toBe(cvf.getDeuteranomalieLabelTextShadow());
      expect(styleDeuteranomalie_btn_frame_background).toBe(cvf.getDeuteranomalieLabelTextShadow());
    });

    await test.step('[CHECK] Check Changes LABEL Color', async () =>{
      const pElements = '.label';

      var styleDeuteranomalie_label = await page.$eval(pElements, function(el){
        return getComputedStyle(el).webkitTextFillColor;
      });

      expect(styleDeuteranomalie_label).toBe(cvf.getDeuteranomalieColorLabel());
    });

    await test.step('[CHECK] Check Changes BODY Background Color', async () =>{
      const body = 'body';

      var styleDeuteranomalie_bodyBackground = await page.$eval(body, function(el){
        return getComputedStyle(el).backgroundColor;
      });

      expect(styleDeuteranomalie_bodyBackground).toBe(cvf.getDeuteranomalieColorBackground());
    });

   await test.step('[ACTION] Change style to Default', async ()=>{
     //ON CHANGE LE STYLE EN DEUTERANOMALIE
     await page.goto(configVisionUrl);
     // Sélecteur CSS pour le bouton
     const boutonAUCUN = '#AUCUN>button';

     //on clique sur le bouton
     await page.click(boutonAUCUN, {timeout: 2000});
   });

   await test.step('[ACTION] Closing page', async()=>{
     await page.close();
   });


  });
});
