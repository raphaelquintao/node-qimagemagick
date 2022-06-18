// import { QIM } from "./lib/esm/index.js";

const QIM = require("./lib");


async function main() {
    console.log(QIM.version);

    let image = await QIM.read_to_buffer('./example-images/coffee.png');

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
    
    
    let buffer = await QIM.convert(image, {
        format: 'png',
        gravity: 'Center',
        crop: '300x300+0+0'
    }).catch(reason => {
        console.log('error: ', reason);
        process.exit(1);
    });

    console.log('Cropped:')
    
    let cropped_info = await QIM.identify(blob).catch(reason => {console.log(reason)});
    console.log(cropped_info);
}

main();
