import { ProxyState } from "../AppState.js";
import { questionsService } from "../Services/QuestionsService.js";
import { Pop } from "../Utils/Pop.js";

function _drawQuestion()
{
    if(ProxyState.currentQuestion != null && ProxyState.questions.length > 0)
    {
        const questionTemplate = ProxyState.questions[ProxyState.currentQuestion].Template;
        document.getElementById("question").innerHTML = questionTemplate;
    }
    else
    {
        document.getElementById("question").innerHTML = "<h1>No More Questions</h1>";
    }
}

export class QuestionsController
{
    constructor()
    {
        questionsService.getQuestions();
        ProxyState.on("questions", _drawQuestion);
        ProxyState.on("currentQuestion", _drawQuestion);
    }

    submitAnswer(answer)
    {
        try
        {
            let swalTitle = "";
            let swalText = "";
            let swalIcon = "";

            if(answer === ProxyState.questions[ProxyState.currentQuestion].correctAnswer)
            {
                swalTitle = "You did it!";
                swalText = `You got the correct answer: ${answer}`;
                swalIcon = "success";
            }
            else
            {
                swalTitle = "You didn't it!";
                swalText = `The correct answer was: ${ProxyState.questions[ProxyState.currentQuestion].correctAnswer}`;
                swalIcon = "error";
            }

            Swal.fire(
            {
                title: swalTitle,
                text: swalText,
                icon: swalIcon,
                confirmButtonColor: '#808080',
                confirmButtonText: "Next question"
            })

            questionsService.nextQuestion();
        }
        catch (error)
        {
            Pop.toast(`Submit error: ${error.message}`, "error", "top-end", 10000, true);
            console.error("[SUBMIT ANSWER ERROR]", error.message);
        }
    }
}