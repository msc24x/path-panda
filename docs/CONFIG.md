# Configuration

Path Panda reads its configuration from a JSON file stored in the extension global storage folder. This avoids modifying the user's workspace.

The file is created automatically the first time the extension runs. You can open it by clicking the status bar indicator or by running the command "Path Panda: Open Config".

## File format

The file is named `.path-panda.json` and supports comments and trailing commas. When you open it, VS Code uses the extension's JSON schema to provide validation and autocompletion.

```
{
  "patterns": [
    // You can remove this example pattern and add your own.
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

## Pattern fields

- `name` (string): Label displayed in the status bar next to the emoji.
- `pattern` (string): Pattern matched against the full file path. The special value `*` matches any file.
- `match_case` (boolean, default `false`): When true, matching is case-sensitive.
- `match_whole_word` (boolean, default `true`): When true, only whole-word matches are allowed.
- `use_regex` (boolean, default `false`): When true, `pattern` is treated as a regular expression.
- `emoji` (string): Any emoji or short text label to prepend to the name.
- `color` (string): Text color. Hex value (`#rgb`, `#rrggbb`, `#rrggbbaa`) or a VS Code status bar foreground theme token. Defaults to `statusBar.foreground`.
- `background_color` (string): Optional status bar background theme token. See the allowed values below.

## Foreground color tokens

When using a theme token for `color`, choose from:

- `statusBar.foreground`
- `statusBarItem.errorForeground`
- `statusBarItem.warningForeground`
- `statusBarItem.prominentForeground`
- `statusBarItem.remoteForeground`
- `statusBarItem.offlineForeground`

## Background color tokens

`background_color` defaults to `statusBarItem.prominentBackground` when omitted. If provided, use one of these theme tokens:

- `statusBarItem.prominentBackground`
- `statusBarItem.warningBackground`
- `statusBarItem.errorBackground`
- `statusBarItem.remoteBackground`
- `statusBarItem.offlineBackground`

Invalid colors are ignored and logged to the Path Panda output channel.
