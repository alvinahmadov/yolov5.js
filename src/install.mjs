import child_process 	from "child_process";
import https 			from "https";
import * as fs 			from "fs"
import AdmZip 			from "adm-zip"
import path 			from "path"
import {
	ABS_PY_EXE,
	PIP_EXE,
	URL,
	DIR,
	PACKAGES,
	ZIPFILE
} 						from "./config.mjs"

import {
	getAbsPath
} 						from "./utils.mjs";

function download(filename, url) {
	console.log("Start download from ", url);

	if (fs.existsSync(filename)) {
		fs.rmSync(filename);
	}

	if (fs.existsSync(filename)) {
		fs.rmdirSync(filename);
	}
	var file = fs.createWriteStream(filename);
	https.get(url, response => response.pipe(file));
}

function extract(filename) {
	console.log("Extracting ", filename);
	let zip = AdmZip(getAbsPath(filename));
	zip.extractAllTo(DIR, true);
}

function installDeps() {
	console.log("Installing dependencies...");
	// Install virtualenv
	child_process.execSync(`${ABS_PY_EXE} -m venv ${path.resolve(getAbsPath(PACKAGES['yolov5']), 'venv')}`);
	// Install requirements
	child_process.execSync(`${PIP_EXE} install --upgrade -r ${path.resolve(getAbsPath(PACKAGES['yolov5']), 'requirements.txt')} --no-cache-dir`);
}

function prepare() {
	try {
		download(ZIPFILE, URL);
		console.log(`Downloaded ${ZIPFILE}.`);
		console.log(`Extracting to ${PACKAGES['yolov5']}`);
		setTimeout(function () { extract(ZIPFILE) }, 10000);
	} catch (e) {
		console.log(e);
	}
}
prepare();
setTimeout(installDeps, 10000);
setTimeout(function () { fs.rmSync(ZIPFILE) }, 20000);