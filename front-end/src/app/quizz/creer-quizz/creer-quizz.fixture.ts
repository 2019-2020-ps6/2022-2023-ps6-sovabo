import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class CreerQuizFixture extends E2EComponentFixture {
  getTitle() {
    return this.page.getByRole('heading', { name: 'Créer mon quizz' });
  }

  getHomeButton() {
    return this.page.locator('#polyquizHome');
  }

  clickHomeButton() {
    return this.getHomeButton().click();
  }

  getButtonRetour() {
    return this.page.getByRole('button', { name: "RETOUR" });
  }

  clickButtonRetour() {
    return this.getButtonRetour().click();
  }

  getTitreQuiz() {
    return this.page.getByPlaceholder("Titre du quiz…");
  }

  getDescriptionQuiz() {
    return this.page.locator('textarea[name="descriptionQuiz"]');
  }

  getDifficultyBar() {
    return this.page.$$('.difficulty-bar');
  }

  clickImageQuiz() {
    return this.page.locator('#image-quiz-id').click();
  }

  getQuestionsQuiz() {
    return this.page.$$('div.titre-question > input');
  }

  getUniqueReponsesQuiz(index1: number, index2: number) {
    return this.page.getByTestId('reponse-'+index1+'-'+index2);
  }

  clickButtonAddReponse(index: number) {
    return this.page.getByTestId('boutonAjouterReponse-'+index).click();
  }

  clickButtonAddQuestion() {
    return this.page.locator('.boutonPlus').click();
  }

  clickSelectionnerBonneReponse(index1: number, index2: number) {
    return this.page.getByTestId('reponseBubble-'+index1+'-'+index2).click();
  }

  getButtonValider() {
    return this.page.getByRole('button', { name: "VALIDER" });
  }

  clickButtonValider() {
    return this.getButtonValider().click();
  }

  getMessageErreur() {
    return this.page.locator('.alert-danger');
  }
}
