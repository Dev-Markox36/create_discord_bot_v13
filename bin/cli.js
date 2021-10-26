#!/usr/bin/env node

const {execSync} = require('child_process');

const runCommand = (command) => {
    try {
        execSync(command, {stdio: 'inherit'});
    } catch (error) {
        console.error(`Fallo al ejecutar: ${command}`, error);
        return false;
    }
    return true;
};


const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/Dev-Markox36/create_discord_bot_v13.git ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Clonando el repositorio como: ${repoName}`);

const checkOut = runCommand(gitCheckoutCommand);
if (!checkOut) process.exit(1);

console.log('Instalando dependencias para ' + repoName);
const installDeps = runCommand(installDepsCommand);
if (!installDeps) process.exit(1);

console.log('Instalación completa, para comenzar sigue los siguientes pasos');
console.log(`cd ${repoName} && npm run dev`);
