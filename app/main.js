import { QuestionsController } from "./Controllers/QuestionsController.js";

class App
{
    questionsController = new QuestionsController();
}

window["app"] = new App();
