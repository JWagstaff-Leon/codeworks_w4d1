import { ProxyState } from "../AppState.js";
import { Question } from "../Models/Question.js";

class QuestionsService
{
    async getTenQuestions()
    {
        const response = await axios.get("https://opentdb.com/api.php?amount=10");
        const newQuestions = response.data.results.map(question => new Question(question));
        const questionsList = [...ProxyState.questions, ...newQuestions];

        if(!ProxyState.currentQuestion)
        {
            ProxyState.currentQuestion = 0;
        }
        ProxyState.questions = questionsList;
    }

    async nextQuestion(correct)
    {
        ProxyState.questionsAnswered += 1;
        if(correct)
        {
            ProxyState.questionsCorrect += 1;
        }
        // request more questions when there's only 2 questions left
        if(ProxyState.questions.length - ProxyState.currentQuestion < 3)
        {
            for(let i = 0; i < ProxyState.currentQuestion; i++)
            {
                ProxyState.questions.shift();
            }
            ProxyState.currentQuestion = 0;
            this.getTenQuestions();
        }

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