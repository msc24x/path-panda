# Change Log

All notable changes to the "path-panda" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.1.1] - 2026-05-30

### Fixed

- Updated changelog to reflect all changes introduced in 0.1.0.

## [0.1.0] - 2026-05-30

### Added

- Search options for pattern matching: `match_case`, `match_whole_word`, and `use_regex`.
- Foreground `color` now accepts hex values or VS Code status bar theme tokens.
- Default `color` is `statusBar.foreground` when omitted.
- Default `background_color` is `statusBarItem.prominentBackground` when omitted.
- Output channel for logging invalid values.

## [0.0.1] - 2026-05-30

### Added

- Status bar indicators based on active editor file path.
- Multiple indicators when multiple patterns match.
- Config file stored in extension global storage, created automatically with a default pattern.
- JSONC support: comments and trailing commas.
- Built-in JSON schema for validation and autocompletion.
- Click indicators to open the config file.
- Command palette access: "Path Panda: Open Config".
- Config file opens as JSONC to avoid comment errors.
- Background color support via VS Code status bar theme tokens.
