# gh-docs

## Development

Install the gulp command line utility and js-beautify.

```shell
npm install --global gulp-cli js-beautify
```

Install the npm packages in your devDependencies.

```shell
npm install && npm run prepare
npx husky add .husky/pre-commit "npx lint-staged --allow-empty"
```

Watching Files.

```shell
gulp watch
```

## Deployment

```shell
gulp build
```
