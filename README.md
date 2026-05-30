# Path Panda

Path Panda shows status bar indicators based on the active editor file path. Configure patterns in the generated `.path-panda.json` file and open it anytime via the Command Palette using "Path Panda: Open Config".

## Features

- Status bar indicators based on the active editor file path.
- Multiple indicators when multiple patterns match.
- Config file created automatically in extension global storage.
- Click any indicator to open the configuration file.
- Supports JSON with comments and trailing commas.

## Configuration

The config file is stored in the extension global storage folder and is created automatically the first time the extension runs. Open it by clicking a Path Panda indicator or by running the command "Path Panda: Open Config" from the Command Palette.

Example configuration:

```
{
  // You can remove this example pattern and add your own.
  "patterns": [
    {
      "name": "Path Panda",
      "pattern": "*",
      "emoji": "PP",
      "color": "#ffffff",
      "background_color": "statusBarItem.prominentBackground"
    }
  ]
}
```

For all fields and allowed background tokens, see [docs/CONFIG.md](docs/CONFIG.md).
When the config file is open, VS Code provides validation and completions from the built-in schema.

## Commands

- Path Panda: Open Config

## Development

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for setup and development workflow instructions.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for a short overview of how the extension works.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Run `npm install` and verify with `npm run lint` and `npm test`.
4. Open a pull request describing the changes.
