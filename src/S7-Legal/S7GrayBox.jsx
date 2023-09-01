import React, { Component } from "react";
import S7Header from "./S7Header";

class S0GrayBox extends Component {
  render() {
    return (
      <div className="section">
        <div style={{ width: 1200 }}>
          <S7Header />
          <h1>Ken-Q Analysis</h1>
          <h2>Copyright (C) 2019 Shawn Banasick</h2>
          <br />

          <h2>Attribution</h2>
          <span>
            Banasick, S. (2019). Ken-Q Analysis (Version 1.0.7) [Software].
            Available from https://shawnbanasick.github.io/ken-q-analysis/
            doi:10.5281/zenodo.1300201.
          </span>
          <br />
          <br />
          <span>
            This program is free software: you can redistribute it and/or modify
            it under the terms of the GNU General Public License as published by
            the Free Software Foundation, either version 3 of the License, or
            (at your option) any later version.
          </span>
          <hr />
          <span>
            THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
            'AS IS ' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
            LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
            FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
            COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
            INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
            BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
            LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
            CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
            LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
            ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
            POSSIBILITY OF SUCH DAMAGE.
          </span>
          <hr />
          <div style={{ marginTop: 35 }}>
            <span>Built with:</span>
            <ul>
              <li>React (MIT license) </li>
              <li>React Easy State (MIT license)</li>
              <li>React-dropzone (MIT license)</li>
              <li>React-platform-js (MIT license)</li>
              <li>Semantic-UI-React (MIT license)</li>
              <li>D3.js (BSD license)</li>
              <li>ag-Grid (MIT license)</li>
              <li>Filesaver.js (MIT license)</li>
              <li>Lodash (MIT license)</li>
              <li>Papa Parse 4 (MIT license)</li>
              <li>Blob.js - Copyright (C) 2014 by Eli Grey</li>
              <li>numeric.js - Copyright (C) 2011 by Sébastien Loisel</li>
              <li>SheetJS js-xlsx (Apache-2.0 license)</li>
            </ul>
            <span>
              Principal components based on Javascript version by Dominik
              Dumaine, adapted from Python version by Thomas Metcalf (GNU GPL
              license), derived from G.H. Golub and C. Reinsch (1970) "Singular
              Value Decomposition and Least Squares Solutions." Numerische
              Mathematik 14(5), pp. 403-420. Varimax rotation based on Fortran
              77 version in PQMethod (GNU GPL license) by Peter Schmolck, based
              on the QMethod program by John R. Atkinson.
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default S0GrayBox;
