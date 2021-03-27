# YOLOv5.js

### Project was created for using YOLOv5 for nodejs

For first step project downloads and installs yolov5 package from [ultralytics](https://github.com/ultralytics/yolov5) of version 4.0

If wanted to detect all images in a folder pass folder name to ```yolo.detect``` args

```

const config = {
	/**
	 * We can use as a single image file name or
	 * path where images are located.
	 * E.g. ./data/images | ./data/images/sample1.png
	 * */
	source: path.resolve(__dirname, './data/images/sample1.png'),
	/**
	 * Model weights can be downloaded
	 * from https://github.com/ultralytics/yolov5/releases
	 * and saved in data/weights directory
	 * */
	model: path.resolve(__dirname, './data/weights/yolov5m.pt'),
	size: 640
};

(async () => {
	let yolo = new YOLOv5(config.model);
	yolo.detect(config.source, config.size);
})()
```

## Required:
 - Python >= 3.7 (Windows)
 - Nodejs >= 14.16.0 Stable (Windows)

For installation:
```
npm i
```

Running:
```
node example.js
```

Author: [Alvin Ahmadov](https://www.github.com/alvinahmadov)