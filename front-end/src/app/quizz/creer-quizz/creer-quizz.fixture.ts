import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class AppFixture extends E2EComponentFixture {
  getTitle() {
    return this.page.getByRole('heading', { name: 'Créer mon quizz' });
  }

  getButton(name: string) {
    return this.page.getByRole('button', { name: name });
  }

  clickButton(name: string) {
    return this.getButton(name).click();
  }

  getTitreQuiz() {
    return this.page.getByPlaceholder("Titre du quiz…");
  }

  getDescriptionQuiz() {
    return this.page.getByRole('textbox');
  }

  getDifficulteQuiz() {
    return this.page.$('#noteDifficulty');
  }

  getImageQuiz() {
    return this.page.$('#recup-fichier');
  }

  getQuestionsQuiz() {
    return this.page.$$('div.titre-question > input');
  }

  getReponsesQuiz() {
    return this.page.$$('div.reponse > input');
  }
}
