# node-qimagemagick

You can install this module using npm

`npm install qimagemagick`

## Requirements
- ImageMagick CLI:
  * Debian/Ubuntu/Linux Mint: `sudo apt-get install imagemagick`


## Example

```javascript
import { QIM } from "qimagemagick";
// const { QIM } = require("qimagemagick");

async function main() {
    let image = await QIM.read_to_buffer('./example-images/coffee.png');
    
    let info = await QIM.identify(image).then(value => value);
    console.log(info);
    
    let blob = await QIM.convert(image, {
        format: 'jpg',
        resize: '50%'
    }).then(value => {
        return value;
    }).catch(reason => {
        console.log('error: ', reason);
        process.exit(1);
    });
    
    let converted_info = await QIM.identify(blob);
    console.log(converted_info);
}

main();
```
#### Output
``` text
Info {
  width: 1909,
  height: 1066,
  format: 'PNG',
  depth: '8-bit',
  colorspace: 'sRGB',
  size: '1.8288MiB'
}
Info {
  width: 955,
  height: 533,
  format: 'JPEG',
  depth: '8-bit',
  colorspace: 'sRGB',
  size: '181.8047KiB'
}
```
