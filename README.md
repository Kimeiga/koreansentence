# Random Korean Sentence

From KSS dataset

https://www.kaggle.com/datasets/bryanpark/korean-single-speaker-speech-dataset

Professionally voiced Korean sentences written by a native speaker. 12854 entries.

Then we run Google translate on each word to get word by word translation.

I tried running Papago from Naver on each word but felt it was slightly less accurate.

Naturally the best thing to do would be to get the linguistic breakdown of each word since there are particles, but that would be harder to display.

Clicking on a word takes you to the entry in Naver's Korean to English dictionary.

We get the nouns from the english translation of the sentence with NLP and then use that to find a relevant background image with Unsplash.

Hosted on Vercel, using Svelte's server side code to fetch my decompressed version of the dataset on github with JSDelivr.

Found a nice handwritting font from Google Fonts to help you learn how to write naturally.

Enjoy!