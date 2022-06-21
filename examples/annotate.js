const {QIM, Annotate} = require("./../lib");


async function main() {
    console.log(QIM.version);
    
    let source = 'https://placedog.net/854/480';
    let dest = './example-images/tmp/dog.png';
    
    
    let buffer = await QIM.convert(source, {
        gravity: 'SouthWest',
        pointsize: 40,
        stroke: 'black',
        fill: 'pink',
        strokewidth: 1,
        annotate: new Annotate(new Date().toLocaleDateString('en-US'), '+20+0'),
    }).catch(reason => {
        console.log('error: ', reason);
        process.exit(1);
    });
    
    buffer = await QIM.convert(buffer, {
        gravity: 'North',
        pointsize: 60,
        stroke: 'black',
        strokewidth: 1,
        fill: 'red',
        annotate: new Annotate('The Dog')
    }, dest);
    
    
    let info = await QIM.identify(buffer).catch(reason => {console.log(reason)});
    console.log(info);
}

main();
