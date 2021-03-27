import path 			from "path";
import * as fs 			from "fs";
import { spawn } 		from "child_process"
import { OS, PACKAGES } from "./config.mjs";
import { getAbsPath } 	from "./utils.mjs";

export class YOLOv5 {
	/**
	 * @param {string} model: Path to weights for model.
	 * @param {string} device: Device to use (cpu|cuda)
	 * @param {number} iouThres: IOU threshold for NMS
	 * @param {number} confThres: Object confidence threshold
	 * @param {boolean} agnosticNMS: Class-agnostic NMS
	 * @param {boolean} augment: Augmented inference
	 * */
	constructor(
		model,
		device = 'cpu',
		iouThres = 0.4,
		confThres = 0.5,
		agnosticNMS = false,
		augment = false
	) {
		this.model = model;
		this.iouThres = iouThres;
		this.confThres = confThres;
		this.agnosticNMS = agnosticNMS;
		this.augment = augment;
		this.device = device;
		this.workdir = path.resolve('node_modules', 'yolov5', PACKAGES['yolov5']);
		this.pyexe = (OS === "Win32")
			? path.resolve(this.workdir, 'venv', 'Scripts', 'python.exe')
			: path.resolve(this.workdir, 'venv', 'bin', 'python');

	}

	/**
	 * @param {string} image: Image to detect
	 * @param {number} size: Image resize
	 * @param {string} saveDir: Path to save
	 * */
	detect(image, size = 640, saveDir = 'detections') {
		if (!fs.existsSync(image))
			throw URIError(`File ${image} doesn't exist!`);

		let out = image.slice(image.lastIndexOf(path.sep) + 1, image.lastIndexOf('.'));
		let kwargs = [path.resolve(this.workdir, 'detect.py')];
		kwargs.push(`--weights=${this.model}`);
		kwargs.push(`--source=${image}`);
		kwargs.push(`--conf-thres=${this.confThres}`);
		kwargs.push(`--iou-thres=${this.iouThres}`);
		kwargs.push(`--device=${this.device}`);
		kwargs.push(`--project=${getAbsPath(saveDir)}`);
		kwargs.push(`--name=${out}`);
		kwargs.push('--save-txt');
		kwargs.push('--save-conf');

		if (this.agnosticNMS)
			kwargs.push('--agnostic_nms');
		if (this.augment)
			kwargs.push('--augment');

		let res = spawn(this.pyexe, kwargs);

		res.stdout.on('data', (data) => {
			console.log(data.toString());
		});

		res.stderr.on('data', (data) => {
			console.error(data.toString());
		})

		res.on('error', function (e) {
			console.error(e)
		})

		res.on('close', function (code) {
			if (code === 0)
				console.log("Exit code: Success");
			else
				console.log("Exit code: ", code);
		})
	}
}