import React from "react";

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        <strong>Data Responsibility</strong> by{" "}
                        <a href="https://www.510.global/">510.global</a> under
                        the{" "}
                        <a href="https://github.com/gulfaraz/dr_score/blob/master/LICENSE">
                            GPL-3.0 license
                        </a>
                        .
                    </p>
                </div>
            </footer>
        );
    }
}
