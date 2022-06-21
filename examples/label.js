const {QIM, Annotate} = require("./../lib");


async function main() {
    console.log(QIM.version);
    
    let source = 'https://placedog.net/854/480';
    // let source = './example-images/coffee.png';
    let dest = './example-images/tmp/dog.png';
    
    
    let buffer = await QIM.convert(source, {
        format: 'png',
        gravity: 'Center',
        caption: 'Raphael',
        pointsize: 40,
        bordercolor: 'pink',
        fill: '#7c0939',
        background: 'rgba(0, 0, 0, 0.5)',
        polaroid: '-10',
    }, dest).catch(reason => {
        console.log('error: ', reason);
        process.exit(1);
    });
    
    
    
    let info = await QIM.identify(buffer).catch(reason => {console.log(reason)});
    console.log(info);
}

main();
