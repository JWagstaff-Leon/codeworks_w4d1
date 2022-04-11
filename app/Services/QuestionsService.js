import { ProxyState } from "../AppState.js";
import { Question } from "../Models/Question.js";

class QuestionsService
{
    async getQuestions()
    {
        // temp token for monday a086f173c97341ea0cbdc210b4e28c98389a4c26834a4ecdf892e4a349246dc7
        // const response = await axios.get("https://opentdb.com/api_token.php?command=reset&token=a086f173c97341ea0cbdc210b4e28c98389a4c26834a4ecdf892e4a349246dc7");
        const response = await axios.get("https://opentdb.com/api.php?amount=10");
        // console.log(response);
        const newQuestions = response.data.results.map(question => new Question(question));
        const questionsList = [...ProxyState.questions, ...newQuestions];
        if(!ProxyState.currentQuestion)
        {
            ProxyState.currentQuestion = 0;
        }
        ProxyState.questions = questionsList;
    }

    nextQuestion()
    {
        if(ProxyState.currentQuestion + 1 < ProxyState.questions.length)
        {
            ProxyState.currentQuestion += 1;
        }
        else
        {
            ProxyState.currentQuestion = null;
        }
    }
}

export const questionsService = new QuestionsService();