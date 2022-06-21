const {QIM} = require("./../lib");


async function main() {
    console.log(QIM.version);
    
    let image = await QIM.read_to_buffer('./example-images/coffee.png');

    let buffer = await QIM.convert(image, {
        format: 'png',
        gravity: 'Center',
        crop: '300x300+0+0'
    }).catch(reason => {
        console.log('error: ', reason);
        process.exit(1);
    });
    
    console.log('Cropped:')
    
    let cropped_info = await QIM.identify(buffer).catch(reason => {console.log(reason)});
    console.log(cropped_info);
}

main();
