const fs = require('fs');
const path = require('path');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./src/App'); // Replace with the path to your React app entry point

function listRoutes() {
  const routes = [];
  const context = {};

  // Render each route and collect the paths
  // Make sure you have all your routes defined in your App component
  const paths = [
    '/', // Add your routes here, e.g., '/about', '/contact', etc.
  ];

  paths.forEach((path) => {
    const route = React.createElement(
      StaticRouter,
      { location: path, context: context },
      React.createElement(App)
    );
    ReactDOMServer.renderToString(route);
    routes.push(path);
  });

  console.log('List of routes:');
  routes.forEach((route) => console.log(route));
}

listRoutes();
