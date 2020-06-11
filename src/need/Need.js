import React from "react";
import imageMapResize from "image-map-resizer";
import { Link } from "react-router-dom";

const DEBOUNCED_RESIZE = ((fn, ms) => {
    let timer;
    return _ => {
        clearTimeout(timer);
        timer = setTimeout(_ => {
            timer = null;
            fn();
        }, ms);
    };
})(imageMapResize, 100);

export default class Need extends React.Component {
    componentDidMount() {
        DEBOUNCED_RESIZE();
        window.addEventListener("resize", DEBOUNCED_RESIZE);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", DEBOUNCED_RESIZE);
    }
    render() {
        return (
            <div>
                <section className="container has-text-centered">
                    <Link
                        className="button is-primary is-outlined is-large is-fullwidth"
                        to="/dr"
                    >
                        Calculate D.R. Score
                    </Link>
                </section>
                <section className="hero">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                                The Need for Data Responsibility
                            </h1>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <img
                        className="components-image"
                        alt="Components of an A.I. project - Data, Model and Deploy"
                        src="components.png"
                        useMap="#component-image-map"
                    />
                    <map name="component-image-map">
                        <area
                            shape="rect"
                            coords="100, 70, 458, 430"
                            alt="Data"
                            href="#/fact/data"
                        />
                        <area
                            shape="rect"
                            coords="565, 70, 923, 430"
                            alt="Model"
                            href="#/fact/model"
                        />
                        <area
                            shape="rect"
                            coords="1030, 70, 1388, 430"
                            alt="Deploy"
                            href="#/fact/deploy"
                        />
                    </map>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>
        );
    }
}
