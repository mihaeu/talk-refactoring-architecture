var fs = require('fs'),
    path = require('path');

var imgDirectory = 'img';
var liveEditDirectory = 'live-edit';
var htmlFiles = [ 'index.html', 'editor.html', 'notes.html' ];

var moduleDirectory = path.join(__dirname, '/../..');
var rootDirectory = path.join(__dirname, '/../../../..');

function isSubmodule() {
    var moduleParentDirectoryName = path.basename(path.join(moduleDirectory, '..'));
    return moduleParentDirectoryName === 'node_modules';
}

function copyRecursiveSync(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (exists && isDirectory) {
        fs.mkdirSync(dest);
        fs.readdirSync(src).forEach(function(childItemName) {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.createReadStream(src).pipe(fs.createWriteStream(dest));
    }
};

function copyRecursiveSyncIfNotExists(src, dest) {
    if (!fs.existsSync(dest)) {
        copyRecursiveSync(src, dest);
    }
}

function copyIndexHtmlWithAdjustedPaths(src, dest, pathAddition) {
    function insertPathAddition(complete, start, address, end) {
        return start + pathAddition + "/" + address + end;
    }

    data = fs.readFileSync(src, 'utf8');

    data = data.replace(/(link[^>]*href=")([^"]*)(")/g, insertPathAddition);
    data = data.replace(/(script[^>]*src=")([^"]*)(")/g, insertPathAddition);

    fs.writeFileSync(dest, data, 'utf8');
}

function copyFiles() {
    var pathAddition = path.relative(rootDirectory, moduleDirectory);

    copyRecursiveSyncIfNotExists(path.join(moduleDirectory, imgDirectory), path.join(rootDirectory, imgDirectory));
    copyRecursiveSyncIfNotExists(path.join(moduleDirectory, liveEditDirectory), path.join(rootDirectory, liveEditDirectory));

    htmlFiles.forEach(function(htmlFile) {
        if (!fs.existsSync(path.join(rootDirectory, htmlFile))) {
            copyIndexHtmlWithAdjustedPaths(path.join(moduleDirectory, htmlFile), path.join(rootDirectory, htmlFile), pathAddition);
        }
    });
}

if (isSubmodule()) {
    copyFiles();
}