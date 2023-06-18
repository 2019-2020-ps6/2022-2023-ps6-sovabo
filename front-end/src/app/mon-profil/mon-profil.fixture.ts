import {E2EComponentFixture} from "e2e/e2e-component.fixture";
import {Locator} from "@playwright/test";

export class MonProfilFixture extends E2EComponentFixture {
  getTitle() {
    return this.page.getByRole('heading', { name: 'PolyQuiz' });
  }

  getCreerButton() {
    return this.page.getByRole('button', { name: 'CREER PROFIL' });
  }

  getBtnDeleteUser() {
    return this.page.getByRole('button', { name: 'SUPPRIMER PROFIL' });
  }

  getBtnRetour() {
    return this.page.getByRole('button', { name: 'RETOUR' });
  }

  async getInputNom() {
    return this.page.$('input[type="text"]');
  }

  getBtnValider() {
    return this.page.getByRole('button', { name: 'Valider' });
  }

  async getCardFromUser(name: string) {
    const selector = `.card:has(h5:has-text('${name}'))`;
    const card = await this.page.locator(selector);
    if (!(await card.count())) throw new Error(`No card found with name ${name}`);
    return card;
  }


  async getCardCreatingUser() {
      return await this.page.locator('.creating-card');
  }

  async getChoisirButtonFromUser(card: Locator) {
    const choisirBtn = await card.locator('button:has-text("Choisir")');
    if (!choisirBtn) throw new Error(`No choisir button found on card ${card}`);
    return choisirBtn;
  }

  async getBtnAnnulerCreation() {
    return this.page.getByRole('button', { name: 'Annuler' });
  }

  async getUserSVG(name?:string) {
    if (!name) return this.page.locator('.user-svg');
    return this.page.locator(`.card:has(h5:has-text('${name}')) .user-svg`)
  }

  async modifyAvatar() {
    if (await this.page.isVisible('.selectAvatar')) {
      await this.page.locator('.selectAvatar .avatar-image').nth(0).click();
    }
    else if (await this.page.isVisible('.modifyAvatar')) {
      await this.page.locator('.modifyAvatar .avatar-image').nth(1).click();
    }
  }

  async closeModalAvatar() {
    if (await this.page.isVisible('.selectAvatar')) {
      await this.page.locator('.selectAvatar .close-button').click();
    }
    else if (await this.page.isVisible('.modifyAvatar')) {
      await this.page.locator('.modifyAvatar .close-button').click();
    }
  }

  async getBtnAnnulerSuppression() {
    return this.page.getByRole('button', { name: 'ANNULER' });
  }

  async unselectProfil() {
    if (await this.page.isVisible('text=Selectionné')) {
      return this.page.locator('text=Selectionné').click();
    }
    return Promise.resolve();
  }

  async getAlert(alertMessage: string, alertType: string) {
    const alert = await this.page.locator(`.alert-${alertType}`);
    return alert.locator(`text=${alertMessage}`);
  }
}
