// obfuscate.js
import JavaScriptObfuscator from 'javascript-obfuscator';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.join(__dirname, 'dist', 'assets');

console.log('Starting obfuscation...');

// Check if directory exists
if (!fs.existsSync(buildDir)) {
    console.error(`Error: Directory ${buildDir} not found. Did Vite build successfully?`);
    process.exit(1);
}

const files = fs.readdirSync(buildDir).filter(file => file.endsWith('.js'));

if (files.length === 0) {
    console.log('No JS files found to obfuscate.');
    process.exit(0);
}

files.forEach(file => {
    const filePath = path.join(buildDir, file);
    const sourceCode = fs.readFileSync(filePath, 'utf8');

    const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false,
        disableConsoleOutput: true,
        identifierNamesGenerator: 'hexadecimal',
        log: false,
        numbersToExpressions: true,
        simplify: true,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
        selfDefending: true,
    });

    fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode());
    console.log(`Obfuscated: ${file}`);
});

console.log('Obfuscation complete!');   