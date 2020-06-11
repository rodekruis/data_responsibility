import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Need from "./need/Need";
import DR from "./dr/DR";
import Glossary from "./glossary/Glossary";
import Feedback from "./feedback/Feedback";
import Footer from "./footer/Footer";
import "./app.scss";

export default class App extends React.Component {
    render() {
        return (
            <div className="dr-score">
                <Router>
                    <div className="router-content">
                        <Navbar />
                        <Switch>
                            <Route path="/dr">
                                <DR />
                            </Route>
                            <Route path="/glossary">
                                <Glossary />
                            </Route>
                            <Route path="/feedback">
                                <Feedback />
                            </Route>
                            <Route exact path="/">
                                <Need />
                            </Route>
                        </Switch>
                    </div>
                </Router>
                <Footer />
            </div>
        );
    }
}
