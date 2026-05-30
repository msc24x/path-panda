# Path Panda

Path Panda shows status bar indicators based on the active editor file path.

## How to Use

1. [Install Path Panda](https://marketplace.visualstudio.com/items?itemName=msc24x.path-panda) from the VS Code Marketplace.
2. Open the config file to customize patterns:
    - Run the command **"Path Panda: Open Config"** from the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
    - Or click any Path Panda status bar indicator (if present) at the bottom left.
3. Edit patterns to match file paths and see the indicators update instantly.

For detailed configuration options, see [docs/CONFIG.md](docs/CONFIG.md).

## Features

- Status bar indicators based on the active editor file path.
- Multiple indicators when multiple patterns match.
- Pattern matching with `match_case`, `match_whole_word`, and `use_regex` options.
- Customize foreground and background colors via hex values or VS Code theme tokens.

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
      "match_case": false,
      "match_whole_word": true,
      "use_regex": false,
      "emoji": "🐼",
      "color": "statusBar.foreground",
      "background_color": "statusBarItem.prominentBackground"
    }
  ]
}
```

For all fields, allowed foreground tokens, and background tokens, see [docs/CONFIG.md](docs/CONFIG.md).
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
