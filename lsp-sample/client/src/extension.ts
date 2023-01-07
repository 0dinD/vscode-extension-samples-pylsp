/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import { homedir } from 'os';
import { resolve } from 'path';
import { ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// TODO: change to a more sensible location
	const logFile = resolve(homedir(), "pylsp.log");

	const serverOptions: ServerOptions = {
		command: "pylsp",
		args: [ "--log-file", logFile ],
		transport: TransportKind.stdio
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for python files
		documentSelector: [{ scheme: 'file', language: 'python' }]
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'pylsp',
		'Python LSP Server',
		serverOptions,
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
