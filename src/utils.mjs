import path from "path"
import { DIR } from "./config.mjs";

export function getAbsPath(dir) {
	return path.resolve(DIR, dir);
}
