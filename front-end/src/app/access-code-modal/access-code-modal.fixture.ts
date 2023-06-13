import {E2EComponentFixture} from "../../../e2e/e2e-component.fixture";

export class AccessCodeModalFixture extends E2EComponentFixture{
  async getAccessCodeInput() {
    const input = await this.page.$('input[type="password"]');
    await input?.fill('1234');
    await this.page.click('button[type="submit"]');
  }
}
