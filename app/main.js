const fs = require("fs");
const path = require("path");
const zlib=require("zlib");
console.log("Logs from your program will appear here!");


const command = process.argv[2];

switch (command) {
  case "init":
    createGitDirectory();
    break;
  case "cat-file":
    catFile(arguments);
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

async function catFile(arguments) {
  const objectSha = arguments.at(-1);
  const objectFolder = objectSha[0] + objectSha[1];
  const objectFile = objectSha.slice(2);
  const compressedFileContent = fs.readFileSync(path.join(__dirname, '.git', 'objects', objectFolder, objectFile));
  const uncompressedFileContent = zlib.inflateSync(compressedFileContent);
  const headerEnd = uncompressedFileContent.toString().indexOf('\x00');
1
  process.stdout.write(uncompressedFileContent.toString('utf-8').slice(headerEnd + 1));
}