const fs = require('fs');
const glob = require('glob')

const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(webDirent => webDirent.isDirectory())
        .map(webDirent => webDirent.name)
const webDirectories = getDirectories("./skewer/build/Page/")

webDirectories.forEach(moduleFolder => {
    function createDevDirAndCopyFilesFor(asset) {
        
        const webDir = `./skewer/build/Page/${moduleFolder}/web/`;
        const assetDir = `./skewer/build/Page/${moduleFolder}/web/${asset}/`;
        const devDir = `./skewer/build/Page/${moduleFolder}/web/${asset}/dev/`;
    
    
        // * сначала прохоим по файлу и создаем необходимые директории, если они не существуют
        if (!fs.existsSync(webDir)) {
            fs.mkdirSync(webDir);
            console.log("web folder created for ", moduleFolder);
        }
        if (!fs.existsSync(assetDir)) {
            fs.mkdirSync(assetDir);
            console.log(`${asset} folder created for `, moduleFolder);
        }
        if (!fs.existsSync(devDir)) {
            fs.mkdirSync(devDir);
            console.log("dev folder created for ", moduleFolder);
        }
    
        // * затем копируем оригиналы файлов в папку dev, чтобы не менять везде зависимости
        glob(`*.${asset}`, { cwd: assetDir, nodir: true }, function (er, files) {
            files.forEach(entryName => {
                copyFromName = `${assetDir}${entryName}`
                copyToName = `${devDir}${entryName}`
    
                console.log("____________________________________________________");
                console.log("мы копируем это", copyFromName);
                console.log("cюда", copyToName);
                // entryObject[name] = looker
                fs.copyFile(copyFromName, copyToName, (err) => {
                    if (err) throw err;
                    console.log('copied!');
                });
            })
        })
    }

    createDevDirAndCopyFilesFor('js');
    createDevDirAndCopyFilesFor('css');
});