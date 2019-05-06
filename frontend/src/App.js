import React, { Component } from 'react';
import Grid from "./components/Grid.jsx";
import Header from "./components/Header.jsx"

class App extends Component {
  render() {
    return (
        <main>
            <Header />
            <Grid />
        </main>
    );
  }
}

export default App;
