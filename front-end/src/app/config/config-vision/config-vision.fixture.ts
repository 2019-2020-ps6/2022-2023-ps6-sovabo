import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ConfigVisionFixture extends E2EComponentFixture {

  hexToRGB(hex:string, alpha:number|null) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }

  //PARTIE DEUTERANOMALIE
  getDeuteranomalieColorBtn(){
    return this.hexToRGB('#805ad0',null);
  }

  getDeuteranomalieColorLabel(){
    return this.hexToRGB('',null);
  }
  getDefaultBackgroundReturn(){
    return 'rgba(0, 0, 0, 0)';
  }
  getBtnDEUTERANOMALIE() {
    return this.page.locator('#DEUTERANOMALIE');
  }

  getDescription() {
    return this.page.getByText('Start your first app!', { exact: true });
  }

  getShowButton() {
    return this.page.getByRole('button', { name: 'Show success!' });
  }

  clickOnShowButton() {
    return this.getShowButton().click();
  }

  getSuccessMessage() {
    return this.page.getByText('Wow!');
  }
}
