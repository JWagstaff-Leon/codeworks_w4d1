// FIXME character codes break the game
export class Question
{
    constructor(data)
    {
        this.category = data.category;
        this.difficulty = data.difficulty[0].toUpperCase() + data.difficulty.substring(1);
        this.type = data.type
        this.question = data.question;
        this.correctAnswer = data.correct_answer;

        if(this.type === "boolean")
        {
            this.answers = ["True", "False"];
        }
        else
        {
            this.answers = [...data.incorrect_answers, data.correct_answer];

            for(let i = 0; i < 50; i++)
            {
                const shuffle1 = Math.floor(Math.random() * this.answers.length);
                const shuffle2 = Math.floor(Math.random() * this.answers.length);

                const temp = this.answers[shuffle1];
                this.answers[shuffle1] = this.answers[shuffle2];
                this.answers[shuffle2] = temp;
            }
        }
    }

    get Template()
    {
        let template = `
        <div class="mt-2 mb-5">
            <h2>${this.category}</h2>
            <h1>${this.question}</h1>
            <h5 class="fst-italic text-secondary">${this.type === "multiple" ? "Multiple Choice" : "True/False"} | ${this.difficulty}</h5>
        </div>
        <div class="d-flex flex-column mx-auto">
        `;

        this.answers.forEach(answer =>
        {
            template += `
                <button class="btn btn-dark my-1 px-4" onclick="app.questionsController.submitAnswer('${answer}')">${answer}</button>
            `;
        });
                
        template += `
            </ul>
        </div>
        `;

        return template;
    }
}