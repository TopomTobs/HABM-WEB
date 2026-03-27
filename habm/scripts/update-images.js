import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const personsFile = path.join(process.cwd(), 'src', 'data', 'persons.ts');

function getImagesForFolder(folder) {
  if (!folder) return null;

  const folderPath = path.join(publicDir, folder);
  if (!fs.existsSync(folderPath)) return null;

  const files = fs.readdirSync(folderPath);
  const images = files
    .filter(file => /\.(jpg|jpeg|png|gif|avif|webp)$/i.test(file))
    .map(file => `${folder}/${file}`);

  return images;
}

function updatePersonsFile() {
  let content = fs.readFileSync(personsFile, 'utf-8');

  // Simple way: replace images arrays for persons with folder
  // Since it's hard to parse, use regex to find folder and then images

  // But to make it simple, since we know the structure, replace the images lines after folder

  // For each person, if folder is not '', set images to the list

  // But since it's text, use regex

  // Find all folder: '...' and then the next images: [...]

  const lines = content.split('\n');
  let newLines = [];
  let currentFolder = '';

  for (let line of lines) {
    if (line.includes('folder:')) {
      const match = line.match(/folder:\s*'([^']*)'/);
      if (match) {
        currentFolder = match[1];
      }
    }
    if (line.includes('images:') && currentFolder) {
      const images = getImagesForFolder(currentFolder);
      if (images) {
        const imagesStr = images.map(img => `'${img}'`).join(', ');
        line = `    images: [${imagesStr}],`;
      }
    }
    newLines.push(line);
  }

  content = newLines.join('\n');
  fs.writeFileSync(personsFile, content);
  console.log('Updated persons.ts with automatic images based on folder');
}

updatePersonsFile();