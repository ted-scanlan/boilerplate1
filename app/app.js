import React from "react";
import ReactLogo from "./components/reactLogo";
import styles from "./app.css";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div data-testid="logo" className={styles.logoContainer}>
          <ReactLogo />
        </div>
        <div data-testid="title" className={styles.title}>
          My React application boilerplate
        </div>
      </React.Fragment>
    );
  }
}

export default App;
