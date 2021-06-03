const axios = require("axios");
import React from "react";
import moment from "moment";
import AddQuestion from "./AddQuestion.jsx";

export default class QuestionAndAnswers extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      showedAnswers: 2,
      showedQuestions: 2,
      product_id: 12010,
      show: false,
    };

    this.changeView = this.changeView.bind(this);
    this.loadQuestions = this.loadQuestions.bind(this);
    this.loadAnswers = this.loadAnswers.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  changeView() {
    this.setState({
      show: !this.state.show,
    });
  }

  loadQuestions() {
    this.setState({
      showedQuestions: this.state.showedQuestions + 1,
    });
  }

  loadAnswers() {
    this.setState({
      showedAnswers: this.state.showedAnswers + 1,
    });
  }

  getAll() {
    axios
      .get(`/questions/${this.state.product_id}`)
      .then((response) => {
        this.setState({
          data: response.data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    this.getAnswers = this.getAnswers.bind(this);
  }



  getAnswers(answers) {
    var arr = [];
    for (var key in answers) {
      arr.push(answers);
    }
    return arr;
  }

  render() {
    return (
      <div className="px-80 font-sans space-y-7">
        <div>
          <h1>Questions and Answers</h1>
          <div className="pt-2 relative mx-auto text-gray-600">
            <input
              className="border-2 border-gray-300 bg-white h-10 px-3 pr-18 rounded-lg text-sm focus:outline-none w-96"
              type="search"
              name="search"
              placeholder="Have a question ? search for answers..."
            ></input>
            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
              <svg
                className="h-7 w-7 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          {this.state.data
            .filter(
              (elm, filterIndex) => filterIndex < this.state.showedQuestions
            )
            .map((question, index) => {
              return (
                <div key={index} className="text-XL">
                  <div classNameName="flex justify-between space-x-1.5">
                    <h1 className="text-black font-bold">
                      Q : {question.question_body}
                    </h1>
                    <div>
                      <span className="text-xs font-thin space-x-1.5 ">
                        helpful ? yes ({question.question_helpfulness}) | </span>
                      <span className="underline text-xs font-thin space-x-1.5">
                        add answer
                      </span>
                    </div>
                  </div>
                  <div>{console.log(question)}</div>
                  <div>
                    {this.getAnswers(question.answers)
                      .filter(
                        (elm, filterIndex) =>
                          filterIndex < this.state.showedAnswers
                      )
                      .map((oneAnswer, ind) => {
                        return (
                          <div k={ind} className="text-gray-800 font-bold">
                            A :
                            <span className="text-xs font-normal">
                              {ind < this.state.showedAnswers &&
                                Object.entries(oneAnswer)[ind][1].body}
                            </span>
                            <h6 className="text-gray-400 font-thin text-xs space-x-0.5">
                              <span>by </span>
                              {ind < this.state.showedAnswers &&
                                Object.entries(oneAnswer)[ind][1].answerer_name}
                              |
                              {ind < this.state.showedAnswers &&
                                moment(
                                  Object.entries(oneAnswer)[ind][1].date
                                ).format("MMMM Do YYYY")}
                              | <span>helpful </span>
                              <span className="underline">
                                {ind < this.state.showedAnswers &&
                                  Object.entries(oneAnswer)[ind][1]
                                    .helpfulness}{" "}
                              </span>
                              | <span className="underline">report</span>
                            </h6>
                          </div>
                        );
                      })}
                  </div>
                  <span
                    className="text-xs font-semibold pointer-events-auto cursor-pointer"
                    onClick={this.loadAnswers}
                  >
                    load more answers
                  </span>
                </div>
              );
            })}
        </div>
        <div className="space-x-1.5">
          <button
            className="bg-transparent hover:bg-gray-300 text-gray-700 font-semibold hover:text-gray-800 py-2 px-4 border border-gray-500 hover:border-transparent rounded"
            onClick={this.loadQuestions}
          >
            MORE ANSWERED QUESTIONS
          </button>
          <button
            className="bg-transparent hover:bg-gray-300 text-gray-700 font-semibold hover:text-gray-800 py-2 px-4 border border-gray-500 hover:border-transparent rounded"
            onClick={this.changeView}
          >
            ADD A QUESTION +
          </button>
        </div>
        <div>
          {this.state.show ? (
            <AddQuestion addQuestion={this.addQuestion} id={this.state.product_id}/>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}
