import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import { serverUrl } from "src/config/server.config";

export class JouerQuizzFixture extends E2EComponentFixture {
  async gotoQuizPage(quizId: string) {
    const url = `${serverUrl}accueil-quiz/${quizId}`;
    await this.page.goto(url);
  }

  async verifyTitleContains(expectedText: string) {
    const title = await this.page.title();
    expect(title).toContain(expectedText);
  }

  // Ajoutez d'autres méthodes et assertions nécessaires pour vos tests.
}
