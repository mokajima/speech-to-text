# Speech-to-Text Demo

Speech-to-Text Demo is a Node.js script to convert speech into text using [Cloud Speech-to-Text](https://cloud.google.com/speech-to-text/).

## How to use

### node

```bash
$ GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json node index.js -e 'FLAC' -u 'gs://cloud-samples-tests/speech/brooklyn.flac'
```

### ts-node

```bash
$ GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json ts-node index.ts -e 'FLAC' -u 'gs://cloud-samples-tests/speech/brooklyn.flac'
```

`serviceAccount.json` is a path of a JSON file that contains your GCP service account key. `-e` and `-u` are required options. `-e` points to an encoding of an audio file. `-u` points to a URI of an audio file, which should be a Google Cloud Storage URI.

Available options are as below:

| Option | Option<br />(short name) | Required | Default | |
| ---- | ---- | ---- | ---- | ---- |
| `--encoding` | `-e` | ✅ | | [Encoding of an audio file](https://cloud.google.com/speech-to-text/docs/encoding) |
| `--uri` | `-u` | ✅ | | URI of an audio file |
| `--languageCode` | `-l` |  | `en-US` | [Language code of an audio file](https://cloud.google.com/speech-to-text/docs/languages) |
| `--sampleRateHertz` | `-s` |  | `16000` | Sample rate in Hertz of an audio file |

## Article (Japanese)

https://mokajima.com/speech-to-text/
