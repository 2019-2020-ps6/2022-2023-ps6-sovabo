import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ConfigVisionFixture extends E2EComponentFixture {

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
