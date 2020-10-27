import React from "react";
import Score from "./Score";
import Report from "./Report";
import Badge from "./Badge";

const DEFAULT_ANSWER = "idk";
const NO_ANSWER = "idk";

const ANSWER_TYPE = {
    TEXT: "Text",
    DROPDOWN: "Dropdown",
};

const SPREADSHEET_URL =
    "https://spreadsheets.google.com/feeds/list/1yJLzqMXmgvEsZFpABbvE57cVlLdou_jOW1nKGCz6mpo/3/public/values?alt=json";

const ANSWER_KEY = {
    yes: "Yes",
    no: "No",
    idk: "I don't know",
};

export default class FACT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
        };
    }

    componentDidMount() {
        fetch(SPREADSHEET_URL)
            .then(response => response.json())
            .then(spreadsheet_data => {
                this.setState({
                    questions: this.get_spreadsheet_questions(spreadsheet_data),
                });
            });
    }

    get_spreadsheet_questions(spreadsheet_data) {
        return spreadsheet_data.feed.entry.map(question_row => {
            return {
                question: question_row.gsx$question.$t,
                answerType: question_row.gsx$answertype.$t,
                answer:
                    question_row.gsx$answertype.$t === "Dropdown"
                        ? DEFAULT_ANSWER
                        : "",
                weight: 1,
                answerPoint: question_row.gsx$answerpoint.$t,
            };
        });
    }

    calculate_score(metric, component, questions = this.state.questions) {
        let numerator = questions
            .map(question => {
                const answer = question.answer.trim();
                let answer_weight = 0;
                if (question.answerType === ANSWER_TYPE.DROPDOWN) {
                    answer_weight = answer === question.answerPoint;
                } else {
                    answer_weight = answer.length > 0;
                }
                return answer_weight * question.weight;
            })
            .reduce((accumulator, current) => accumulator + current, 0);
        let denominator = questions
            .map(question => {
                return Math.max(0, question.weight);
            })
            .reduce((accumulator, current) => accumulator + current, 0);
        return Math.max(0, Math.round(100 * (numerator / denominator)));
    }

    load_scoreboard() {
        return <div>{this.load_fact_score()}</div>;
    }

    load_fact_score() {
        const fact_score = this.calculate_score();
        return (
            <nav className="level">
                <div className="level-item has-text-centered">
                    <div>
                        <p className="title">D.R. Score</p>
                    </div>
                </div>
                <div className="level-item"></div>
                <div className="level-item"></div>
                <div className="level-item"></div>
                <div className="level-item"></div>
                <div className="level-item"></div>
                <Score score_value={fact_score} />
                <div className="level-item"></div>
                <div className="level-item"></div>
                <div className="level-item"></div>
                <Report
                    answer_key={ANSWER_KEY}
                    calculate_score={this.calculate_score}
                    questions={this.state.questions}
                    no_answer={NO_ANSWER}
                />
                <Badge score={fact_score} />
            </nav>
        );
    }

    change_answer(index) {
        return event => {
            let updated_questions = this.state.questions;
            updated_questions[index].answer = event.target.value;
            this.setState({
                questions: updated_questions,
            });
        };
    }

    load_question(item, index) {
        return (
            <div
                className={
                    "field" +
                    (item.answerType === "Dropdown" ? " is-horizontal" : "")
                }
            >
                <div className="field-label is-size-4">{item.question}</div>
                <div className="field-body">
                    {item.answerType === "Dropdown" ? (
                        <div className="select">
                            <select
                                value={item.answer}
                                onChange={this.change_answer(index)}
                            >
                                {Object.entries(ANSWER_KEY).map(
                                    ([answer_key, answer_value]) => {
                                        return (
                                            <option
                                                value={answer_key}
                                                key={answer_key}
                                            >
                                                {answer_value}
                                            </option>
                                        );
                                    }
                                )}
                            </select>
                        </div>
                    ) : (
                        <div className="textarea-container">
                            <textarea
                                className="textarea"
                                placeholder="Enter your answer here"
                                value={item.answer}
                                onChange={this.change_answer(index)}
                            ></textarea>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    load_questions() {
        return this.state.questions.map((item, index) => {
            return <div key={index}>{this.load_question(item, index)}</div>;
        });
    }

    answer_summary() {
        return (
            <div className="field is-horizontal is-size-4">
                <div className="field-label"># Answered</div>
                <div className="field-body">
                    {
                        this.state.questions.filter(
                            question =>
                                question.answer.trim() !== NO_ANSWER &&
                                question.answer.trim().length > 0
                        ).length
                    }
                    /{this.state.questions.length}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <nav className="level">
                                <div className="level-item">
                                    <div>
                                        <h1 className="title">
                                            Calculate D.R. Score
                                        </h1>
                                        <br />
                                        <h1 className="subtitle">
                                            Your score reflects your data
                                            responsibility.
                                        </h1>
                                    </div>
                                </div>
                                <Score label="legend" score_value=">70" />
                                <Score label="legend" score_value="30-70" />
                                <Score label="legend" score_value="<30" />
                            </nav>
                        </div>
                    </div>
                </section>
                <div className="container">
                    {this.load_scoreboard()}
                    {this.answer_summary()}
                    {this.load_questions()}
                </div>
            </div>
        );
    }
}
