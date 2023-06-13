import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class JouerQuizzFixture extends E2EComponentFixture {
  quizName: string;


  constructor(page: any, quizName: string) {
    super(page);
    this.quizName = quizName;
  }
  getTitle() {
    return this.page.getByRole('heading', { name: /{{quiz.name}}/ }); // Remplacez {{quiz.name}} par la valeur réelle
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

  getQuestionBubble() {
    return this.page.locator('.question-bubble');
  }

  getQuestionText() {
    return this.page.locator('#question-animation');
  }

  getAnswerButtons() {
    return this.page.locator('.answer');
  }

  getValidateButton() {
    return this.page.locator('.check-container button');
  }

  getNextQuestionButton() {
    return this.page.locator('.buttons-container button:not(.check-container button)');
  }

  getResultsButton() {
    return this.page.locator('.buttons-container button[routerLink="/resultat-quizz"]');
  }

  getWrongAnswerMessage() {
    return this.page.locator('.buttons-container .wrong-answer');
  }

  getCorrectAnswerMessage() {
    return this.page.locator('.buttons-container .good-answer');
  }

    // JouerQuizzFixture

  async getQuizTitle() {
    const titleElement = this.page.locator('.titreStyle');
    return await titleElement.textContent();
  }

  async getTimer() {
    const timerElement = this.page.locator('.timer');
    return await timerElement.textContent();
  }

  async selectAnswerByIndex(index: any) {
    const answerButtons = await this.getAnswerButtons().elementHandles();
    return answerButtons[index].click();
  }

  async getNextButtonDisabledStatus() {
    const nextButton = this.getNextQuestionButton();
    return await nextButton.getAttribute('disabled');
  }

}
