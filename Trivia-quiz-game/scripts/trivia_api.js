const API_KEY =
  '43d8e5b76e77965ad27a60f3c5899e0b4d1bf7b9f2ef77f8eb88d7e578bd4f54';
const url = 'https://opentdb.com/api.php';

class QuizApi {
  constructor(baseURL, apiKey) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }
  async getQuizzes() {
    try {
      const { data } = await axios.get(
        `${this.baseURL}?amount=10&type=boolean`
      );
      return data;
    } catch (error) {
      console.error('error fetching Quizzes: ', error);
    }
  }
}
const quizApi = new QuizApi(url, API_KEY);

export { quizApi };
