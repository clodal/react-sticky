import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import { Basic } from "./basic";
import { Relative } from "./relative";
import { Stacked } from "./stacked";
import { Capture } from "./capture";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Aside } from "./aside";
import styles from "./styles";

ReactDOM.render(
  <Router>
    <div className="app">
      <style>{styles}</style>
      <Navbar />
      <div className="examples">
        <Route exact path="/" render={() => <Redirect to="/basic" />} />
        <Route path="/basic" component={Basic} />
        <Route path="/relative" component={Relative} />
        <Route path="/stacked" component={Stacked} />
        <Route path="/capture" component={Capture} />
        <Route path="/footer" component={Footer} />
        <Route path="/aside" component={Aside} />
      </div>
    </div>
  </Router>,
  document.querySelector("#mount")
);
