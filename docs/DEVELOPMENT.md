# Development

## Prerequisites

- Node.js 18+
- npm

## Install dependencies

```
npm install
```

## Run the extension

1. Open this folder in VS Code.
2. Press F5 to launch the Extension Development Host.
3. Open any file in the host. The Path Panda indicator appears in the status bar.

## Build

```
npm run compile
```

## Lint

```
npm run lint
```

## Tests

```
npm test
```

## Versioning

Path Panda uses the semantic version in `package.json`.

- Patch: `npm version patch`
- Minor: `npm version minor`
- Major: `npm version major`

After bumping the version, update `CHANGELOG.md` with the release notes and commit the change.

## Packaging and publishing

1. Install the VS Code packaging tool:

```
npm install --global @vscode/vsce
```

2. Verify the extension builds:

```
npm run lint
npm run compile
```

3. Package a `.vsix` for distribution:

```
vsce package
```

4. Publish to the Marketplace (requires a publisher account and a personal access token):

```
vsce publish
```

## Repo layout

- `src/extension.ts`: Extension entry point and status bar logic.
- `docs/CONFIG.md`: Configuration format and examples.
- `docs/DEVELOPMENT.md`: Developer workflow.
