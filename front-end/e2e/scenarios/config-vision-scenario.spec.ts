import { test, expect } from '@playwright/test';
import {accueilUrl, configVisionUrl, testUrl, configUrl} from 'e2e/e2e.config';
import { ConfigVisionFixture } from 'src/app/config/config-vision/config-vision.fixture'
import {timeout} from "rxjs";
import {AccueilFixture} from "../../src/app/accueil/accueil-fixture";

// https://playwright.dev/docs/locators
test.describe('configVision Jeu Couleur', () => {
  /*
  test('[DEFAULT COLOR] Test', async({page}) =>{
    await test.step('[ACTION] Change Style to DEFAULT', async () =>{
      //ON CHANGE LE STYLE EN DEFAULT
      await page.goto(configVisionUrl);
      // Sélecteur CSS pour le bouton
      const boutonDEFAULT = '#AUCUN>button';

      //on clique sur le bouton
      await page.click(boutonDEFAULT, {timeout: 2000});
    });

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
  })
  test('[DEUTERANOMALIE COLOR] Test', async ({ page }) => {
    let cvf = new ConfigVisionFixture(page);

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
     //ON CHANGE LE STYLE EN DEFAULT
     await page.goto(configVisionUrl);
     // Sélecteur CSS pour le bouton
     const boutonAUCUN = '#AUCUN>button';

     //on clique sur le bouton
     await page.click(boutonAUCUN, {timeout: 2000});
   });
  });
  test('[TRITANOPIE COLOR] Test', async({page}) =>{
    let cvf = new ConfigVisionFixture(page);

    await test.step('[ACTION] Change Style to TRITANOPIE', async () =>{
      //ON CHANGE LE STYLE EN DEUTERANOMALIE
      await page.goto(configVisionUrl);
      // Sélecteur CSS pour le bouton
      const boutonTRITANOPIE = '#TRITANOPIE>button';

      //on clique sur le bouton
      await page.click(boutonTRITANOPIE, {timeout: 2000});
    });

    await test.step('[CHECK] Check Changes BTN Color', async () =>{
      const boutonsColor = 'app-btn-on-off-colors>button';
      const boutonsFont = 'app-btn-font>button';
      const boutonsClickableBackground = 'app-btn-clickable-background>button';
      const boutonsClickableFrameBackground = 'app-btn-clickable-frame-background>button';

      var styleTritanopie_btn_color = await page.$eval(boutonsColor, function (el){
        return getComputedStyle(el).backgroundColor;
      });

      var styleTritanopie_btn_font = await page.$eval(boutonsFont, function (el){
        return getComputedStyle(el).backgroundColor;
      });

      var styleTritanopie_btn_background = await page.$eval(boutonsClickableBackground, function(el){
        return getComputedStyle(el).backgroundColor;
      });

      var styleTritanopie_btn_frame_background = await page.$eval(boutonsClickableFrameBackground, function(el){
        return getComputedStyle(el).backgroundColor;
      });

      expect(styleTritanopie_btn_color).toBe(cvf.getTritanopieColorBtn());expect(styleTritanopie_btn_font).toBe(cvf.getTritanopieColorBtn());
      expect(styleTritanopie_btn_background).toBe(cvf.getTritanopieColorBtn());
      expect(styleTritanopie_btn_frame_background).toBe(cvf.getTritanopieColorBtn());
    });

    await test.step('[CHECK] Check Changes BTN Text Style', async () =>{
      const boutonsColor = 'app-btn-on-off-colors>button';
      const boutonsFont = 'app-btn-font>button';
      const boutonsClickableBackground = 'app-btn-clickable-background>button';
      const boutonsClickableFrameBackground = 'app-btn-clickable-frame-background>button';

      var styleTritanopie_btn_color = await page.$eval(boutonsColor, function (el){
        return getComputedStyle(el).textShadow;
      });

      var styleTritanopie_btn_font = await page.$eval(boutonsFont, function (el){
        return getComputedStyle(el).textShadow;
      });

      var styleTritanopie_btn_background = await page.$eval(boutonsClickableBackground, function(el){
        return getComputedStyle(el).textShadow;
      });

      var styleTritanopie_btn_frame_background = await page.$eval(boutonsClickableFrameBackground, function(el){
        return getComputedStyle(el).textShadow;
      });

      expect(styleTritanopie_btn_color).toBe(cvf.getTritanopieLabelTextShadow());expect(styleTritanopie_btn_font).toBe(cvf.getTritanopieLabelTextShadow());
      expect(styleTritanopie_btn_background).toBe(cvf.getTritanopieLabelTextShadow());
      expect(styleTritanopie_btn_frame_background).toBe(cvf.getTritanopieLabelTextShadow());
    });

    await test.step('[CHECK] Check Changes LABEL Color', async () =>{
      const pElements = '.label';

      var styleTritanopie_label = await page.$eval(pElements, function(el){
        return getComputedStyle(el).webkitTextFillColor;
      });

      expect(styleTritanopie_label).toBe(cvf.getTritanopieColorLabel());
    });

    await test.step('[CHECK] Check Changes BODY Background Color', async () =>{
      const body = 'body';

      var styleTritanopie_bodyBackground = await page.$eval(body, function(el){
        return getComputedStyle(el).backgroundColor;
      });

      expect(styleTritanopie_bodyBackground).toBe(cvf.getTritanopieColorBackground());
    });

    await test.step('[ACTION] Change style to Default', async ()=>{
      //ON CHANGE LE STYLE EN DEFAULT
      await page.goto(configVisionUrl);
      // Sélecteur CSS pour le bouton
      const boutonAUCUN = '#AUCUN>button';

      //on clique sur le bouton
      await page.click(boutonAUCUN, {timeout: 2000});
    });

    await test.step('[ACTION] Closing page', async()=>{
      await page.close();
    });
  })
  */
  test('[FONT] Test', async ({page})=>{
    let cvf = new ConfigVisionFixture(page);
    await page.goto(configVisionUrl);
    await test.step('[CHECK] Check Default Font', async()=>{
      const fontLabel = '.label'
      const fontBtn = '.fontStyleCanChange'
      var defaultFontLabel = await page.$eval(fontLabel, function (el){
        return getComputedStyle(el).fontFamily;
      });
      var defaultFontBtn = await page.$eval(fontBtn, function (el){
        return getComputedStyle(el).fontFamily;
      });
      expect(defaultFontLabel).toMatch(cvf.defaultLabeltFont());
      expect(defaultFontBtn).toMatch(cvf.defaultBtntFont());
    });

    const random = (Math.floor(Math.random()*3))+1;
    await test.step('[ACTION] Set custom font', async()=>{
      //on clique sur l'une des font de manière aléatoire
      await page.click('#btn_fontChanger'+random,{timeout: 2000});
      await page.click('#fontChangerConfirmation');
    });

    await test.step('[CHECK] Custom Font is correctly apply', async()=>{
      const fontLabel = '.label'
      const fontBtn = '.fontStyleCanChange'

      var customFontLabel = await page.$eval(fontLabel, function (el){
        return getComputedStyle(el).fontFamily;
      });
      var customFontBtn = await page.$eval(fontBtn, function (el){
        return getComputedStyle(el).fontFamily;
      });

      switch (random){
        case 1:
          expect(customFontLabel).toMatch(cvf.arialCustomFont());
          expect(customFontBtn).toMatch(cvf.arialCustomFont());
          break;
        case 2:
          expect(customFontLabel).toMatch(cvf.andaleCustomFont());
          expect(customFontBtn).toMatch(cvf.andaleCustomFont());
          break;
        case 3:
          expect(customFontLabel).toMatch(cvf.comicCustomFont());
          expect(customFontBtn).toMatch(cvf.comicCustomFont());
          break;
        case 4:
          expect(customFontLabel).toMatch(cvf.nunitoCustomFont());
          expect(customFontBtn).toMatch(cvf.nunitoCustomFont());
          break;
      };
    });
  });

  test('[FONT SIZE] Test', async({page})=>{
  });
  /*test('[FONT] Test', async ({page})=>{
    let af = new AccueilFixture(page);
    test.step('[ACTION] Navigation jusqu\'à ConfigurationVision', async()=>{
      page.goto(accueilUrl);
      let btnConfigs = af.getConfigurationBtn();
      btnConfigs.click();
      /* NE FONCTIONNE PAS CHEZ MOI
      await page.getByRole('button', { name: 'CONFIGURATION' }).click({timeout: 2000});
      await page.waitForURL(configUrl);
      let input = 'form>input';
      await page.fill(input,'1234');
      let submit = 'form>button';
      await page.click(submit);
    });
    let cvf = new ConfigVisionFixture(page);

  });*/
});


