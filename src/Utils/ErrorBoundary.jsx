import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: null,
    hasError: false,
    showError: false,
  };

  componentDidCatch(e) {
    this.setState({
      hasError: true,
      error: e.message,
      errorMessage: e.stack,
    });
  }

  render() {
    return this.state.hasError ? (
      <div className="m-[50px]">
        <h1>There was an unexpected error</h1>
        <p className="text-2xl m-8">
          At the top of the page, click the reload button to restart the
          application
        </p>
        {!this.state.showError && (
          <button
            onClick={() =>
              this.setState({
                showError: true,
              })
            }
          >
            Show error →
          </button>
        )}
        {this.state.showError && (
          <pre>
            <code>{this.state.error}</code>
          </pre>
        )}
        <br />
        <br />
        <br />
        {this.state.showError && (
          <pre>
            <code>{this.state.errorMessage}</code>
          </pre>
        )}
      </div>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
