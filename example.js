import { QIM } from "./lib/esm/index.js";


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
