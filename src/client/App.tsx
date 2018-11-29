// <reference path='./index.d.ts'/>

import React from "react";

import Routes from "./Routes";

const App = () => (
  <main className="container">
    <div>
      <h1>hello world!</h1>
      <p>If you see this everything is working!</p>
    </div>
    <Routes />
  </main>
);

export default App;
