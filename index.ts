import { v1p1beta1 } from '@google-cloud/speech'
import { program } from 'commander'
import * as fs from 'fs'

type AudioEncoding =
  | 'ENCODING_UNSPECIFIED'
  | 'LINEAR16'
  | 'FLAC'
  | 'MULAW'
  | 'AMR'
  | 'AMR_WB'
  | 'OGG_OPUS'
  | 'SPEEX_WITH_HEADER_BYTE'
  | 'MP3'

const DEFAULT_CONFIG = {
  enableAutomaticPunctuation: true,
}

const client = new v1p1beta1.SpeechClient()

program
  .option('-l, --languageCode <languageCode>', undefined, 'en-US')
  .option('-s, --sampleRateHertz <sampleRateHertz>', undefined, '16000')
  .requiredOption('-e, --encoding <encoding>')
  .requiredOption('-u, --uri <uri>')
  .action(async () => {
    const { encoding, languageCode, sampleRateHertz, uri } = program.opts()
    const audio = { uri }
    const config = {
      ...DEFAULT_CONFIG,
      encoding,
      languageCode,
      sampleRateHertz,
    }

    try {
      const [operation] = await client.longRunningRecognize({ audio, config })
      const [response] = await operation.promise()

      const transcription = response.results
        ?.map((result) => result.alternatives?.[0].transcript)
        .join('\n')

      fs.writeFile('./transcription.txt', transcription ?? '', (error) => {
        if (error) {
          throw error
        }
      })
    } catch (error) {
      console.error(error)
    }
  })

program.parse(process.argv)
