import child_process from "child_process";
import path          from "path";
import * as fs       from "fs"
import boa           from '@pipcook/boa/tools/utils.js';

const {getCondaPath} = boa;

const list = {
	'numpy':       '1.20.1',
	'torch':       '1.8.1',
	'torchvision': '0.9.1'
}

const condaPath = getCondaPath();
const pythonPath = path.join(condaPath, 'lib/python3.7');
const sitePkgPath = path.join(pythonPath, 'site-packages');

function isPkgInstall(pkgName) {
	let dir = path.join(sitePkgPath, pkgName);
	console.log(dir)
	return fs.existsSync(dir);
}

function isPyInstall() {
	return fs.existsSync(pythonPath)
}

function installPkg(name, version) {
	//https://pypi.tuna.tsinghua.edu.cn/simple
	const cmd = `bip install --upgrade ${name}==${version} --default-timeout=1000000 --no-cache-dir`;
	
	child_process.execSync(cmd, {
		stdio: 'inherit'
	})
	
}

function installDeps() {
	if (!isPyInstall()) {
		return;
	}
	Object.keys(list).forEach((name) => {
		if (isPkgInstall(name)) {
			console.log(`${name} have been installed`);
			return;
		}
		installPkg(name, list[name])
	})
}

function installYolov5() {
	
	const file = path.resolve('./src/tool/requirements.txt');
	const cmd = `bip install --upgrade -r ${file} --default-timeout=1000000 --no-cache-dir`;
	
	child_process.execSync(cmd, {
		stdio: 'inherit'
	})
}

installYolov5();
