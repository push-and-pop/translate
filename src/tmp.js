//这个文件没有卵用


	// // Use the console to output diagnostic information (console.log) and errors (console.error)
	// // This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "lt-translate" is now active!');

	// // The command has been defined in the package.json file
	// // Now provide the implementation of the command with  registerCommand
	// // The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('lt-translate.translate', async function () {
	// 	let editor = vscode.window.activeTextEditor;
	// 	if (!editor) {
	// 		return
	// 	}
	// 	let selection = editor.selection;
	// 	let text = editor.document.getText(selection);
	// 	if (text.length) {
	// 		console.log(text);
	// 		const res = await baidu(text).then(res => res).catch(e => {
	// 			vscode.window.showInformationMessage(e);
	// 		});

	// 		// Display a message box to the user
	// 		await vscode.window.showInformationMessage(res.trans_result[0].dst);
	// 	}

	// });

	// context.subscriptions.push(disposable);