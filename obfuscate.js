// obfuscate.js
const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// Path to your built bundle (Vite usually outputs to 'dist/assets/*.js')
// Adjust this path based on your actual build output
const buildDir = path.join(__dirname, 'dist', 'assets');
const files = fs.readdirSync(buildDir).filter(file => file.endsWith('.js'));

console.log('Starting obfuscation...');

files.forEach(file => {
    const filePath = path.join(buildDir, file);
    const sourceCode = fs.readFileSync(filePath, 'utf8');

    const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.75,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.4,
        debugProtection: false, // Set to true to disable console, but breaks debugging
        debugProtectionInterval: 0,
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