# node-qimagemagick

You can install this module using npm

`npm install qimagemagick --save`

## Requirements
- ImageMagick CLI:
  * Debian/Ubuntu: `sudo apt-get install imagemagick`


## Examples

### Convert and show info
```javascript
import { QIM } from "qimagemagick";
// const { QIM } = require("qimagemagick");

async function main() {
    let image = await QIM.read_to_buffer('https://placedog.net/640/480');
    
    let info = await QIM.identify(image).catch(reason => {console.log(reason)});
    console.log(info);
    
    let blob = await QIM.convert(image, {
        format: 'jpg',
        resize: '50%'
    }).catch(reason => {
        console.log('error: ', reason);
        process.exit(1);
    });
    
    let converted_info = await QIM.identify(blob).catch(reason => {console.log(reason)});
    console.log(converted_info);
}

main();
```
##### Output
``` text
Info {
  width: 1909,
  height: 1066,
  page_width: 1909,
  page_height: 1066,
  offset_x: 0,
  offset_y: 0,
  format: 'PNG',
  depth: '8-bit',
  colorspace: 'sRGB',
  size: '1.8288MiB'
}
Info {
  width: 955,
  height: 533,
  page_width: 955,
  page_height: 533,
  offset_x: 0,
  offset_y: 0,
  format: 'JPEG',
  depth: '8-bit',
  colorspace: 'sRGB',
  size: '181.8047KiB'
}
```

### Crop from center
```javascript
import { QIM } from "qimagemagick";
// const { QIM } = require("qimagemagick");

async function main() {
    let image = await QIM.read_to_buffer('./example-images/coffee.png');

    let blob = await QIM.convert(image, {
        gravity: 'Center',
        crop: '300x300+0+0'
    }).catch(reason => {
        console.log('error: ', reason);
        process.exit(1);
    });
    
    let converted_info = await QIM.identify(blob).catch(reason => {console.log(reason)});
    console.log(converted_info);
}
main();
```
##### Output
``` text
Info {
  width: 300,
  height: 300,
  page_width: 1909,
  page_height: 1066,
  offset_x: 804,
  offset_y: 383,
  format: 'PNG',
  depth: '8-bit',
  colorspace: 'sRGB',
  size: '36.2393KiB'
}
```

### Reading images
* From local file
  ```javascript
  let buffer = await QIM.read_to_buffer('./coffee.png');
  let info = await QIM.identify('./coffee.png');
  ```
* From URL
  ```javascript
  let buffer = await QIM.read_to_buffer('https://placedog.net/640/480');
  let info = await QIM.identify('https://placedog.net/640/480');
  ```
* From Buffer
  ```javascript
  let buffer = await QIM.read_to_buffer('https://placedog.net/640/480');
  let info = await QIM.identify(buffer);
  ```

## Full Documentation
To see the full documentation visit: [ImageMagick – Command-line Processing](https://imagemagick.org/script/command-line-processing.php)
