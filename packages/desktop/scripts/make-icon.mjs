// SPDX-License-Identifier: Apache-2.0
// Generates the placeholder icon source (1024x1024, mint square on ink) without
// an image dependency. `npm run icon` feeds it to `tauri icon`.
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const SIZE = 1024;
const [R, G, B] = [45, 212, 191]; // --color-mint

function crc32(buf) {
  if (!crc32.table) {
    crc32.table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      crc32.table[n] = c >>> 0;
    }
  }
  let crc = 0xffffffff;
  for (const byte of buf) crc = crc32.table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(SIZE, 0);
ihdr.writeUInt32BE(SIZE, 4);
ihdr[8] = 8; // bit depth
ihdr[9] = 6; // RGBA

const raw = Buffer.alloc((SIZE * 4 + 1) * SIZE);
const inset = 160;
for (let y = 0; y < SIZE; y++) {
  const rowStart = y * (SIZE * 4 + 1);
  raw[rowStart] = 0; // filter: none
  for (let x = 0; x < SIZE; x++) {
    const i = rowStart + 1 + x * 4;
    const inside = x >= inset && x < SIZE - inset && y >= inset && y < SIZE - inset;
    raw[i] = R;
    raw[i + 1] = G;
    raw[i + 2] = B;
    raw[i + 3] = inside ? 255 : 0;
  }
}

const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(raw)),
  chunk("IEND", Buffer.alloc(0)),
]);

writeFileSync(new URL("../src-tauri/icon-source.png", import.meta.url), png);
console.log("wrote src-tauri/icon-source.png");
