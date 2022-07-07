const sonarqubeScanner = require('sonarqube-scanner');
sonarqubeScanner(
    {
      serverUrl: 'http://localhost:9000',
      options: {
        'sonar.sources': 'src',
        'sonar.projectKey': 'split-api-node-ts',
        'sonar.tests': 'src',
        'sonar.inclusions': '**',
        'sonar.test.inclusions':
        'src/**/*.spec.ts,src/**/*.spec.tsx,src/**/*.test.ts,src/**/*.test.tsx',
        'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
        'sonar.login': 'sqp_d3178028e5f35cde5db0d44be40d5c53ccd0d12b',
      },
    },
    () => {},
);
