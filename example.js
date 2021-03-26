import path from "path";
import YOLOv5    from "./src/index.mjs"

const __dirname = path.resolve(path.dirname(''));

const config = {
	/**
	 * We can use as a single image file name or
	 * path where images are located
	 * */
	source: path.resolve(__dirname, './data/images'),
	/**
	 * Model weights can be downloaded
	 * from https://github.com/ultralytics/yolov5/releases
	 * and saved in data/weights directory
	 * */
	model: path.resolve(__dirname, './data/weights/yolov5m.pt'),
	size:  640
};

(async () => {
	let yolo = new YOLOv5(config.model);
	yolo.detect(config.source, config.size);
})()
