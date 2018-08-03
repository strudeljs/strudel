const helpersContext = require.context('./helpers', true);
helpersContext.keys().forEach(helpersContext);

const testsContext = require.context('./', true, /\.spec$/);
testsContext.keys().forEach(testsContext);
