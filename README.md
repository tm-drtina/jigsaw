## Install: ##

```
npm install
```

## Run: ##

### 1) Static page ###

Development version:
```
npm run dev-static
```
Production version:
```
npm run production
```
Open index.html in browser.

### 2) Dev server with hot update ###

```
npm run dev
```

Open http://localhost:8080 in browser.
Every change *should* reload webpage.

If port *8080* is used by another service, you can change it in *package.json* file.
Add " --port YOUR_PORT " to scripts.dev command.

## Coding style ##
### Javascript ###
We are using ESLint (http://eslint.org/) with Airbnb config (https://github.com/airbnb/javascript) to keep coding style consistent.
However, some rules were modified:
- Indentation is set to 4 spaces instead of 2
- Comma at the end of object is forbidden to keep similarity to JSON
- Function names in lambda functions is not required, if it is possible to assign the name automatically in ES6 (see http://eslint.org/docs/rules/func-names *'as-needed'*)
- Severity of *import/prefer-default-export* is set to *warning* only
  - Some files might have only one export and no default to keep consistency (eg. actions with only one action)
- Line breaks are ignored

### CSS/SCSS ###
Similarly to Javascript, we are using Stylelint (http://stylelint.io/) with default config.

### Run linters ###
Both linters are executed with every dev build (`npm run dev` or `npm run dev-static`). Manual execution is done by the following commands:
```
npm run lint
npm run lint:js
npm run lint:css
```

## Testing ##
Testing Javascript code will be done using Jest (https://facebook.github.io/jest/) and Enzyme (https://github.com/airbnb/enzyme) frameworks.
Jest is developed by Facebook and has tools for testing React apps. Enzyme provides shallow rendering of React components.

Writing tests should follow tutorial from Redux docs (http://redux.js.org/docs/recipes/WritingTests.html).