import Kanji from "./kanji"

export default class Word {
  constructor(kanjis, meanings, readings) {
    this.kanjis = kanjis
    this.meanings = meanings
    this.readings = readings
  }
}
