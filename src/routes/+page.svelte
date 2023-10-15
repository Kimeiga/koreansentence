<script>
	import { romanize } from '@romanize/korean';
	import nlp from 'compromise';

	export let data;
	let words = [];
	let translations = [];
	let romanizedWords = [];

	const copyToClipboard = () => {
		navigator.clipboard.writeText(data.original_script);
	};

	$: if (data && data.original_script) {
		words = data.original_script.split(' ');
		romanizedWords = words.map((word) => romanize(word));
		loadTranslations(words);
		getBackgroundImage();
	}

	async function loadTranslations(wordsArray) {
		translations = Array(wordsArray.length).fill(null);

		for (let i = 0; i < wordsArray.length; i++) {
			const word = wordsArray[i];

			if (word === '못') {
				translations[i] = 'not';
				continue;
			}
			if (word === '적이') {
				translations[i] = 'to some extent';
				continue;
			}
			if (word === '전에') {
				translations[i] = 'previously';
				continue;
			}
			if (word === '저는') {
				translations[i] = 'I';
				continue;
			}

			const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=en&dt=t&q=${encodeURI(
				word
			)}`;
			const response = await fetch(url);
			const result = await response.json();
			translations[i] = result[0][0][0];
		}
	}

	function getBackgroundImage() {
		const nouns = nlp(data.english_translation).nouns().out('array');
		console.log(nouns); // This should give you ["Mom", "time", "middle school"]
		console.log(nouns);
		let backgroundImageURL = `url("https://source.unsplash.com/random/?${nouns.join(' ')}")`;
		document.body.style.backgroundImage = backgroundImageURL;
	}
</script>

{#if data}
	<div class="word-container-wrapper">
		{#each words as word, i}
			<div class="word-container">
				<span class="romanization">{romanizedWords[i]}</span>
				<span class="korean-word"
					><a
						target="_blank"
						href="https://en.dict.naver.com/#/search?query={encodeURIComponent(word)}">{word}</a
					></span
				>
				{#if translations[i]}
					<span class="word-translation">{translations[i]}</span>
				{/if}
			</div>
		{/each}
	</div>
	<p class="translation">{data.english_translation}</p>
	<hr />
	<button on:click={copyToClipboard}>Copy Korean Sentence</button>
	<audio controls src={data.audio} />
{:else}
	<p>Loading...</p>
{/if}

<style>
	.word-container-wrapper {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	.word-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 10px 5px;
	}
	.romanization {
		/* font-family: 'Noto Sans KR', sans-serif; */
		font-size: 1.2rem;
	}
	.korean-word {
		/* font-family: 'Noto Sans KR', sans-serif; */
		font-size: 4rem;
		font-weight: bold;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.word-translation {
		/* font-family: 'Noto Sans KR', sans-serif; */
		font-size: 1.2rem;
	}
	.translation {
		/* font-family: 'Noto Sans KR', sans-serif; */
		font-size: 1.3rem;
	}

	button {
		font-family: 'Gaegu', sans-serif;

		/* transparent grey background color */

		background-color: rgba(0, 0, 0, 0.5);
		color: #ffffff;
		border: none;
		padding: 10px 20px;
		font-size: 16px;
		margin: 4px 2px;
		cursor: pointer;
		border-radius: 12px;
		transition: 0.3s;
		outline: none;
		display: block;
	}

	audio {
		margin-top: 10px;
	}
</style>
