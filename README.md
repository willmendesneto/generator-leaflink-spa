# Leaflink SPA - Yeoman generator

![Yeoman](./assets/yeoman-masthead.png)

This is a yo generator for building Vue frontend components. Install it, run it and start building components!

## How to use

[Make sure you are using `node@>18.17.1` and `npm@>=9.6.0`](https://docs.npmjs.com/getting-started/installing-node)


### Running locally

``` 
npm link
npm install -g yo
mkdir my-project && cd my-project
yo leaflink-spa
```

### Running pointing to published version

```
npm install -g yo generator-leaflink-spa
mkdir my-project && cd my-project
yo leaflink-spa
```

#### Update your boilerplate

> Repositories built with `generator-leaflink-spa`
> can be upgraded to the latest version via CLI using the [NPM package `update-yeoman-generator`](https://github.com/willmendesneto/update-yeoman-generator). 🚀

Make sure you have `npm@>=9.6.0`:

```
npm install -g npm@latest
```

After that, install [NPM package `update-yeoman-generator`](https://github.com/willmendesneto/update-yeoman-generator) globally

```
npm install -g update-yeoman-generator
```

Inside the existing boilerplate generated repository run this command:

```
update-yeoman-generator --generator willmendesneto/generator-leaflink-spa \
  --github-token <your-github-token> \
  --ejs-open 0_- \
  --ejs-close -_0
```

`update-yeoman-generator` command will apply the changes from the latest version of boilerplate as a git style merge - so you'll still need to manually fix conflicts. If you want to understand the reasons why you should pass specific parameters, please check [`update-yeoman-generator` README.md](<(https://github.com/willmendesneto/update-yeoman-generator)>) with all the options.

## Editing the generator

To create a template file whos filename is replaced by one of the user-entered
variables, use the delimiters `_-` and `-_` instead of the ejs style `<%` and
`%>` (`<` and `>` are not allowed on Windows).

## Code architecture

Here is a selection of the interesting parts:

<pre>
.
├── <a href="#nvmrc" title=".nvmrc file">.nvmrc</a>
├── <a href="#editorconfig" title=".editorconfig file">.editorconfig</a>
├── <a href="#changelog" title="changelog file">CHANGELOG.md</a>
├── src
└── test
│   ├── fixtures
│   |   ├── <a href="#testfixtures" title="Description of test fixtures folder">*.ts*</a>
    └── <a href="#testserver" title="Description of test server file">server.ts</a>
    └── <a href="#testsetupenv" title="Description of test setupenv file">setup-env.js</a>
    └── <a href="#testutils" title="Description of test utils file">utils.ts</a>
</pre>

