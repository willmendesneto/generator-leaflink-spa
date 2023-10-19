const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const { version: pkgVersion } = require('../package.json');
const snakeCase = require('lodash/snakeCase');

describe('Generator Leaflink SPA boilerplate: bootstrap', () => {
  const promtArgs = {
    vueAppName: 'test-boilerplate',
    description: 'My description',
    team: 'My Team',
    author: 'John Doe',
    autoLoad: false,
    updateScripts: false,
  };

  before(() => helpers.run(require.resolve('../app')).withPrompts(promtArgs));

  it('should create a `package.json` file with given data', () => {
    assert.jsonFileContent('package.json', {
      name: promtArgs.vueAppName,
      generatorVersion: pkgVersion,
      description: promtArgs.description,
      author: promtArgs.author,
      repository: {
        url: `git+ssh://git@github.com/willmendesneto/${promtArgs.vueAppName}.git`,
      },
      bugs: {
        url: `https://github.com/willmendesneto/${promtArgs.vueAppName}/issues`,
      },
      homepage: `https://github.com/willmendesneto/${promtArgs.vueAppName}#readme`,
    });
  });

  it('should create a `.nvmrc` file with NodeJS v18', () => {
    assert.fileContent('.nvmrc', 'v18.17.1');
  });

  it('should create a `README.md` file with given app data', () => {
    assert.fileContent('README.md', promtArgs.description);
    assert.fileContent('README.md', promtArgs.vueAppName);
    assert.fileContent(
      'README.md',
      `https://github.com/willmendesneto/generator-leaflink-spa/tree/v${pkgVersion}#code-architecture`
    );
  });

  it('should create APP configuration files', () => {
    assert.file([
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.yo-rc.json',
      '.nvmrc',
      '.gitignore',
      'package.json',
    ]);
  });

  it('should create Git Hook config files for the generated SPA', () => {
    assert.file(['.husky/_/.gitignore', '.husky/_/husky.sh']);
  });

  it('should create CI/CD configuration files with static', () => {
    assert.file([
      '.github/dependabot.yml',
      '.github/labeler.yml',
      '.github/PULL_REQUEST_TEMPLATE.md',
      '.github/workflows/cypress.yml',
      '.github/workflows/dependabot-auto-merge.yml',
      '.github/workflows/quality-checks.yml',
      '.github/workflows/release.yml',
      '.github/workflows/stats-reporter.yml',
      '.github/workflows/stats-uploader.yml',
    ]);
  });

  it('should create CI/CD configuration files with dynamic content pointing to the SPA', () => {
    assert.fileContent(
      '.github/workflows/delete-pr.yml',
      `to all the ${promtArgs.vueAppName}`
    );

    assert.fileContent(
      '.github/workflows/delete-pr.yml',
      `role/${promtArgs.vueAppName}-s3-access-github-actions-role`
    );

    assert.fileContent(
      '.github/workflows/delete-pr.yml',
      `'"${promtArgs.vueAppName}-\${{ env.PR_NUMBER }}.dev.leaflink.io"'`
    );

    assert.fileContent(
      '.github/workflows/deploy.yml',
      `role/${promtArgs.vueAppName}-web-s3-access-github-actions-role-\${{ inputs.environment }}`
    );

    assert.fileContent(
      '.github/workflows/deploy.yml',
      `cp ./dist/index.html s3://leaflink-${promtArgs.vueAppName}-web-\${{ inputs.environment }}/deliveries/`
    );

    assert.fileContent(
      '.github/workflows/deploy.yml',
      `cp --recursive ./dist/ s3://leaflink-${promtArgs.vueAppName}-web-\${{ inputs.environment }}/deliveries/`
    );

    assert.fileContent(
      '.github/workflows/pr.yml',
      `https://${promtArgs.vueAppName}-web-\${{ env.PR_NUMBER }}.dev.leaflink.io/deliveries/`
    );
  });

  it.only('should create Provisioning configuration files with dynamic content pointing to the SPA', () => {
    const vueAppNameSnakeCase = snakeCase(promtArgs.vueAppName);
    assert.fileContent(
      'provisioning/terraform/data.tf',
      `${vueAppNameSnakeCase}_bucket`
    );
    assert.fileContent(
      'provisioning/terraform/data.tf',
      `module.${vueAppNameSnakeCase}_oidc_role.role_arn`
    );

    assert.fileContent(
      'provisioning/terraform/iam.tf',
      `module "${vueAppNameSnakeCase}_web_oidc_role"`
    );
    assert.fileContent(
      'provisioning/terraform/iam.tf',
      `module.${vueAppNameSnakeCase}_web_oidc_role.role_name`
    );

    assert.fileContent(
      'provisioning/terraform/s3.tf',
      `data.aws_iam_policy_document.${vueAppNameSnakeCase}_web_bucket.json`
    );
  });

  it("should create main 'index.html' file with SPA title", () => {
    assert.file(['index.html']);

    assert.fileContent('index.html', `<title>${promtArgs.vueAppName}</title>`);
  });
});
