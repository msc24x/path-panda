# Configuration

Path Panda reads its configuration from a JSON file stored in the extension global storage folder. This avoids modifying the user's workspace.

The file is created automatically the first time the extension runs. You can open it by clicking the status bar indicator or by running the command "Path Panda: Open Config".

## File format

The file is named `.path-panda.json` and supports comments and trailing commas. When you open it, VS Code uses the extension's JSON schema to provide validation and autocompletion.

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

## Pattern fields

- `name` (string): Label displayed in the status bar next to the emoji.
- `pattern` (string): Regular expression used to match the full file path. The special value `*` matches any file.
- `emoji` (string): Any emoji or short text label to prepend to the name.
- `color` (string): Hex color for the text. Valid forms: `#rgb`, `#rrggbb`, `#rrggbbaa`.
- `background_color` (string): Optional status bar background theme token. See the allowed values below.

## Background color tokens

VS Code does not allow arbitrary hex colors for status bar backgrounds. Use one of these theme tokens:

- `statusBarItem.prominentBackground`
- `statusBarItem.warningBackground`
- `statusBarItem.errorBackground`
- `statusBarItem.remoteBackground`
- `statusBarItem.offlineBackground`

Invalid colors are ignored and logged to the Path Panda output channel.
