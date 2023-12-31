const fs = require("fs");
const path = require("path");
const zlib=require("zlib");
console.log("Logs from your program will appear here!");


const command = process.argv[2];

switch (command) {
  case "init":
    createGitDirectory();
    break;

  default:
    throw new Error(`Unknown command ${command}`);
}

function createGitDirectory() {
  fs.mkdirSync(path.join(__dirname, ".git"), { recursive: true });
  fs.mkdirSync(path.join(__dirname, ".git", "objects"), { recursive: true });
  fs.mkdirSync(path.join(__dirname, ".git", "refs"), { recursive: true });

  fs.writeFileSync(path.join(__dirname, ".git", "HEAD"), "ref: refs/heads/master\n");
  console.log("Initialized git directory");
}
