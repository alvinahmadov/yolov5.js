import api     from "@pipcook/boa";
import path    from "path";
import * as fs from "fs";

export const __dirname = path.resolve(path.dirname(''));

export class YOLOv5 {
	/**
	 * @param {string} model: Path to weights for model.
	 * @param {string} device: Device to use (cpu|cuda)
	 * @param {number} iouThres: IOU threshold for NMS
	 * @param {number} confThres: Object confidence threshold
	 * @param {boolean} agnosticNMS: Class-agnostic NMS
	 * @param {boolean} augment: Augmented inference
	 * */
	constructor(model,
	            device = 'cpu',
	            iouThres = 0.4,
	            confThres = 0.5,
	            agnosticNMS = false,
	            augment = false) {
		this.model = model;
		this.iouThres = iouThres;
		this.confThres = confThres;
		this.agnosticNMS = agnosticNMS;
		this.augment = augment;
		this.device = device;
		this.yolo = api.import('yolov5');
	}
	
	/**
	 * @param {string} image: Image to detect
	 * @param {number} size: Image resize
	 * @param {string} saveDir: Path to save
	 * */
	detect(image, size = 640, saveDir = 'detections') {
		if (!fs.existsSync(image))
			throw URIError(`File ${image} doesn't exist!`);
		let out = image.slice(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));
		this.yolo.detect(
			api.kwargs({
				           source:       image,
				           img_size:     size,
				           weights:      this.model,
				           conf_thres:   this.confThres,
				           iou_thres:    this.iouThres,
				           augment:      this.augment,
				           device:       this.device,
				           view_img:     false,
				           agnostic_nms: this.agnosticNMS,
				           project:      path.resolve(__dirname, saveDir),
				           name:         out,
				           save_txt:     true,
				           save_conf:    true
			           }));
	}
}

