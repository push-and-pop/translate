// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');
const querystring = require('querystring')
const md5 = require("blueimp-md5")

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Congratulations, your extension "lt-translate" is now active!');

}

let config = vscode.workspace.getConfiguration("translate")

let appid = String(config.get("baidu_appid")) 
let key = String(config.get("baidu_appkey")) 

async function baidu(query) {
	let salt = Math.floor((Math.random() * 100) + 1);
	let sign = md5(appid + query + salt.toString() + key)
	// let from = "en";
	// let to ="";
	const res = await axios.default.post("https://fanyi-api.baidu.com/api/trans/vip/translate",
		querystring.stringify({
			q: query,
			from: "en",
			to: "zh",
			appid: appid,
			salt: salt.toString(),
			sign: sign,
		}), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
	return res.data
}


vscode.languages.registerHoverProvider("*", {
	async provideHover(document, postion, token) {
		let editor = vscode.window.activeTextEditor;
		if (!editor) {
			return
		}
		let selection = editor.selection;
		let text = editor.document.getText(selection);
		//mkstring 用于vscode显示
		let mkstring = new vscode.MarkdownString();

		if (text.length) {
			//console.log(text);
			const res = await baidu(text).then(res => res).catch(e => {
				vscode.window.showInformationMessage(e);
			});
			//遍历结果 添加进mkstring
			for (let data of res.trans_result) {
				mkstring.appendMarkdown(data.dst)
			}
			// Display a message box to the user

		}

		return new vscode.Hover(mkstring)
	}
});


// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
