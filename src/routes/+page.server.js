// // import { data } from '$lib/data';

// // export async function get() {
// // 	const randomIndex = Math.floor(Math.random() * data.length);
// // 	const randomEntry = data[randomIndex];
// // 	const { metadata, audio } = randomEntry;
// // 	return {
// // 		body: {
// // 			metadata,
// // 			audio
// // 		}
// // 	};
// // }

// const randomInt = Math.floor(Math.random() * 12854);
// console.log(randomInt);


// // import fs from 'fs';
// // import path from 'path';

// // // Directory path for the data
// // const DATA_DIR = path.join(process.cwd(), 'src/lib/data');

// // // Fetch all entries from the data directory
// // const getEntries = () => {
// // 	return fs.readdirSync(DATA_DIR, { withFileTypes: true })
// // 		.filter(dirent => dirent.isDirectory())
// // 		.map(dirent => dirent.name);
// // };

// // Fetch a random entry's metadata
// const getRandomEntryMetadata = () => {
// 	const entries = getEntries();
// 	const randomEntry = entries[Math.floor(Math.random() * entries.length)];
// 	const metadataPath = path.join(DATA_DIR, randomEntry, 'metadata.json');
// 	const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
// 	return {
// 		...metadata,
// 		audio: [`/src/lib/data/${randomInt}/audio.wav`]
// 	};
// };

// export async function get() {
// 	try {
// 		const data = getRandomEntryMetadata();
// 		return {
// 			status: 200,
// 			body: data
// 		};
// 	} catch (error) {
// 		return {
// 			status: 500,
// 			body: {
// 				error: 'Failed to fetch random entry.'
// 			}
// 		};
// 	}
// }
import { error } from '@sveltejs/kit';
// import path from 'path';
// import fs from 'fs';

// // Precompute the random integer

// // Fetch a random entry's metadata
// const getRandomEntryMetadata = () => {
// 	const randomInt = Math.floor(Math.random() * 12854);
// 	const metadataPath = path.join(process.cwd(), `src/lib/data/${randomInt}/metadata.json`);
// 	if (fs.existsSync(metadataPath)) {
// 		const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
// 		return {
// 			...metadata,
// 			audio: [`/src/lib/data/${randomInt}/audio.wav`]
// 		};
// 	}
// 	throw new Error('Entry does not exist.');
// };

// export async function load() {
// 	try {
// 		const data = getRandomEntryMetadata();
// 		return data;
// 	} catch (e) {
// 		throw error(500, 'Failed to fetch random entry.');
// 	}
// }

export async function load() {
	try {
		const randomInt = Math.floor(Math.random() * 12854) + 1;
		const metadataURL = `https://cdn.jsdelivr.net/gh/Kimeiga/kss_dataset@main/data/${randomInt}/metadata.json`;

		const response = await fetch(metadataURL);
		if (!response.ok) {
			throw new Error('Failed to fetch metadata.json');
		}
		const metadata = await response.json();

		return {
			...metadata,
			audio: `https://cdn.jsdelivr.net/gh/Kimeiga/kss_dataset@main/data/${randomInt}/audio.wav`
		};

	} catch (e) {
		throw error(500, 'Failed to fetch random entry.');
	}
}
