import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class AccueilFixture extends E2EComponentFixture {
  getConfigurationBtn() {
    return this.page.getByRole('button', { name: 'CONFIGURATION' });
  }

}
