import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const componentDir = path.resolve(__dirname, '..', 'src', 'compoent');

function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const fullPath = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(fullPath) : fullPath;
    });
}

function createCssFile(tsxPath) {
    const baseName = path.basename(tsxPath, '.tsx');
    const cssPath = path.join(path.dirname(tsxPath), `${baseName}.css`);
    if (!fs.existsSync(cssPath)) {
        const content = `.${baseName} {\n    width: 100%;\n    height: 100%;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    background-color: transparent;\n}\n`;
        fs.writeFileSync(cssPath, content, 'utf8');
        console.log(`created ${path.relative(componentDir, cssPath)}`);
    } else {
        console.log(`exists ${path.relative(componentDir, cssPath)}`);
    }
}

walk(componentDir)
    .filter((filePath) => filePath.endsWith('.tsx'))
    .forEach(createCssFile);