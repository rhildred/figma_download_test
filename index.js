import {Headers} from 'node-fetch';
import fetch from 'node-fetch';
import * as fs from 'node:fs/promises';
const headers = new Headers();
let devToken = process.env.DEV_TOKEN;

if (process.argv.length < 3) {
  console.log('Usage: node setup.js <file-key> [figma-dev-token]');
  process.exit(0);
}

if (process.argv.length > 3) {
  devToken = process.argv[3];
}

headers.append('X-Figma-Token', devToken);

const fileKey = process.argv[2];
const baseUrl = 'https://api.figma.com';
let resp = await fetch(`${baseUrl}/v1/files/${fileKey}`, {headers});
let data = await resp.text();
await fs.writeFile("./nodes.json", data);