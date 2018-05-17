// import store from '../store';
import S5Header from "./S5Header";
import React, { Component } from "react";
import { easyComp } from "react-easy-state";
import LoadingsTableTransitionContainer from './LoadingsTableTransitionContainer';


class S5GrayBox extends Component {
    render() {
        return (
            <div className="section">
              <S5Header />
              <LoadingsTableTransitionContainer />
            </div>
            );
    }
}

export default easyComp(S5GrayBox);
