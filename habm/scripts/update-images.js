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

function getVideosForFolder(folder) {
  if (!folder) return null;

  const folderPath = path.join(publicDir, folder);
  if (!fs.existsSync(folderPath)) return null;

  const files = fs.readdirSync(folderPath);
  const videos = files
    .filter(file => /\.(mp4|webm|ogg|mov|avi|mkv|ts|flv|m4v|wmv|3gp)$/i.test(file))
    .map(file => `${folder}/${file}`);

  return videos;
}

function updatePersonsFile() {
  let content = fs.readFileSync(personsFile, 'utf-8');

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
    if (line.includes('videos:') && currentFolder) {
      const videos = getVideosForFolder(currentFolder);
      if (videos && videos.length > 0) {
        const videosStr = videos.map(video => `'${video}'`).join(', ');
        line = `    videos: [${videosStr}],`;
      } else {
        line = `    videos: [],`;
      }
    }
    newLines.push(line);
  }

  content = newLines.join('\n');
  fs.writeFileSync(personsFile, content);
  console.log('Updated persons.ts with automatic images and videos based on folder');
}

updatePersonsFile();