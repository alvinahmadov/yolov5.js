import path 			from "path";
import { getAbsPath } 	from "./utils.mjs";

export const OS = "Win32";
export const PACKAGES = { "yolov5": "yolov5-4.0" };
export const ABS_PY_EXE = 'python';
export const DIR = path.resolve(path.dirname(''));
export const VENV_DIR = path.resolve(DIR, PACKAGES['yolov5'], 'venv')
export const PIP_EXE = (OS === 'Win32')
	? path.resolve(VENV_DIR, "Scripts", "pip.exe")
	: path.resolve(VENV_DIR, "bin", "pip")
export const URL = "https://codeload.github.com/ultralytics/yolov5/zip/refs/tags/v4.0";
export const ZIPFILE = getAbsPath("yolov5.zip");
