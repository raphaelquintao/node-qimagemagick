# node-qimagemagick

## How to use
You can install this module using npm

`npm install qimagemagick`


## Example
```javascript
let image1 = await qim.read_to_buffer('./example-images/coffee.png');
let image2 = './example-images/coffee.png';

    let info1 = await qim.identify(image1);
    console.log(info1);
    
    let blob = await qim.convert(image2, {
        resize: '50%',
    }, './example-images/ok.jpg')
        .catch(reason => {
            console.log('error: ', reason);
            process.exit(1);
        });
    
    let info2 = await qim.identify(blob);
    console.log(info2);
```
Output
```text
Info { width: '1909', height: '1066', format: 'png' }
Info { width: '955', height: '533', format: 'jpeg' }
```