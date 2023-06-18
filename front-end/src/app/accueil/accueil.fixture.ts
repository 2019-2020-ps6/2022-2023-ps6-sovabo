import {E2EComponentFixture} from "e2e/e2e-component.fixture";
import {Locator} from "@playwright/test";

export class AccueilFixture extends E2EComponentFixture {
  getAlert() {
    return this.page.locator('.alert');
  }
}
