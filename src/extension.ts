// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Buffer } from "node:buffer";
import { parse, ParseError } from "jsonc-parser";

const CONFIG_FILE_NAME = ".path-panda.json";
const DEFAULT_CONFIG = `{
	"patterns": [
		// You can remove this example pattern and add your own.
		{
			"name": "Path Panda",
			"pattern": "*",
			"match_case": false,
			"match_whole_word": true,
			"use_regex": false,
			"emoji": "🐼",
			"color": "#ffffff",
			"background_color": "statusBarItem.prominentBackground"
		}
	]
}
`;
const HEX_COLOR_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const ALLOWED_BACKGROUND_TOKENS = new Set([
	"statusBarItem.errorBackground",
	"statusBarItem.warningBackground",
	"statusBarItem.prominentBackground",
	"statusBarItem.remoteBackground",
	"statusBarItem.offlineBackground",
]);

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Extension "path-panda" is now active!');
	const output = vscode.window.createOutputChannel("Path Panda");
	context.subscriptions.push(output);
	const logInfo = (message: string) => {
		output.appendLine(message);
	};
	const escapeRegex = (value: string) =>
		value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const buildMatcher = (options: {
		rawPattern: string;
		matchCase: boolean;
		matchWholeWord: boolean;
		useRegex: boolean;
		name: string;
	}) => {
		if (options.rawPattern === "*") {
			return new RegExp(".*", options.matchCase ? "" : "i");
		}
		const source = options.useRegex
			? options.rawPattern
			: escapeRegex(options.rawPattern);
		const wrapped = options.matchWholeWord ? `\\b(?:${source})\\b` : source;
		try {
			return new RegExp(wrapped, options.matchCase ? "" : "i");
		} catch {
			logInfo(
				`Ignored invalid pattern "${options.rawPattern}" for "${options.name || "(unnamed)"}".`,
			);
			return null;
		}
	};

	const configUri = vscode.Uri.joinPath(
		context.globalStorageUri,
		CONFIG_FILE_NAME,
	);
	const ensureConfigFile = async () => {
		await vscode.workspace.fs.createDirectory(context.globalStorageUri);
		try {
			await vscode.workspace.fs.stat(configUri);
		} catch {
			await vscode.workspace.fs.writeFile(
				configUri,
				Buffer.from(DEFAULT_CONFIG, "utf8"),
			);
		}
		return configUri;
	};

	const openConfig = async () => {
		const uri = await ensureConfigFile();
		const doc = await vscode.workspace.openTextDocument(uri);
		await vscode.languages.setTextDocumentLanguage(doc, "jsonc");
		await vscode.window.showTextDocument(doc, { preview: false });
	};
	context.subscriptions.push(
		vscode.commands.registerCommand("path-panda.openConfig", openConfig),
	);

	let statusItems: vscode.StatusBarItem[] = [];
	const clearStatusItems = () => {
		statusItems.forEach((item) => item.dispose());
		statusItems = [];
	};

	const updateForEditor = async (editor: vscode.TextEditor | undefined) => {
		clearStatusItems();
		if (!editor || !editor.document || editor.document.isUntitled) {
			return;
		}
		const filePath = editor.document.uri.fsPath;
		await ensureConfigFile();
		let patterns: Array<{
			name?: string;
			pattern?: string;
			match_case?: boolean;
			match_whole_word?: boolean;
			use_regex?: boolean;
			emoji?: string;
			color?: string;
			background_color?: string;
		}> = [];
		try {
			const bytes = await vscode.workspace.fs.readFile(configUri);
			const text = Buffer.from(bytes).toString("utf8");
			const errors: ParseError[] = [];
			const json = parse(text, errors, {
				allowTrailingComma: true,
				disallowComments: false,
			});
			if (errors.length) {
				logInfo(
					"Config parse error. Fix .path-panda.json to update indicators.",
				);
				return;
			}
			if (json && Array.isArray(json.patterns)) {
				patterns = json.patterns;
			}
		} catch {
			return;
		}

		const matches = patterns.filter((p) => {
			if (!p || typeof p.pattern !== "string") {
				return false;
			}
			const rawPattern = p.pattern.trim();
			if (!rawPattern.length) {
				return false;
			}
			const matchCase =
				typeof p.match_case === "boolean" ? p.match_case : false;
			const matchWholeWord =
				typeof p.match_whole_word === "boolean"
					? p.match_whole_word
					: true;
			const useRegex =
				typeof p.use_regex === "boolean" ? p.use_regex : false;
			const name = typeof p.name === "string" ? p.name.trim() : "";
			const matcher = buildMatcher({
				rawPattern,
				matchCase,
				matchWholeWord,
				useRegex,
				name,
			});
			return matcher ? matcher.test(filePath) : false;
		});

		if (!matches.length) {
			return;
		}

		matches.forEach((matched, index) => {
			const emoji =
				typeof matched.emoji === "string" ? matched.emoji.trim() : "";
			const name =
				typeof matched.name === "string" ? matched.name.trim() : "";
			const label = [emoji, name].filter(Boolean).join(" ").trim();
			const color =
				typeof matched.color === "string" ? matched.color.trim() : "";
			const backgroundToken =
				typeof matched.background_color === "string"
					? matched.background_color.trim()
					: "";
			const statusItem = vscode.window.createStatusBarItem(
				vscode.StatusBarAlignment.Left,
				100 - index,
			);
			statusItem.name = "Path Panda";
			statusItem.text = label || "Path Panda";
			statusItem.tooltip = filePath;
			if (color) {
				if (HEX_COLOR_PATTERN.test(color)) {
					statusItem.color = color;
				} else {
					logInfo(
						`Ignored invalid color "${color}" for pattern "${name || "(unnamed)"}".`,
					);
				}
			}
			if (backgroundToken) {
				if (ALLOWED_BACKGROUND_TOKENS.has(backgroundToken)) {
					statusItem.backgroundColor = new vscode.ThemeColor(
						backgroundToken,
					);
				} else {
					logInfo(
						`Ignored invalid background_color "${backgroundToken}" for pattern "${name || "(unnamed)"}".`,
					);
				}
			}
			statusItem.command = "path-panda.openConfig";
			statusItem.show();
			statusItems.push(statusItem);
		});
	};

	await ensureConfigFile();
	updateForEditor(vscode.window.activeTextEditor);
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(updateForEditor),
	);
	context.subscriptions.push(
		vscode.workspace.onDidSaveTextDocument((doc) => {
			if (doc.uri.fsPath === configUri.fsPath) {
				updateForEditor(vscode.window.activeTextEditor);
			}
		}),
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
