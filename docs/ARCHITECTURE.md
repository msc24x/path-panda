# Architecture

This document explains how Path Panda works and where its configuration lives.

## Core flow

1. On activation, the extension ensures the config file exists in the extension global storage directory.
2. When the active editor changes, the extension reads the config file and parses the pattern list.
3. Each pattern is treated as a regular expression (except `*`, which matches any file).
4. Every matching pattern produces a status bar indicator.
5. Clicking any indicator opens the config file for editing.

## Configuration storage

The config file is stored in the extension global storage path (`context.globalStorageUri`). This keeps the user's workspace clean and avoids extra files in the project.

## Status bar rendering

Each matching pattern gets its own status bar item. Items inherit their label from the pattern `emoji` and `name`. The item text color accepts hex values. The background color accepts only VS Code theme tokens, not hex values.

## Logging

If a pattern includes an invalid text color or background token, the extension ignores it and logs a message to the Path Panda output channel.
