import _ from 'lodash'

export class Kanji {
  constructor(kanji, meanings, kunyomi, onyomi) {
    this.kanji = kanji
    this.meanings = meanings
    this.kunyomi = kunyomi
    this.onyomi = onyomi
  }
}

export class Word {
  constructor(kanjis, meanings, readings) {
    this.kanjis = kanjis
    this.meanings = meanings
    this.readings = readings
  }

  display() {
    return this.kanjis
  }

  meaning() {
    return _.sample(this.meanings)
  }

  reading() {
    return _.sample(this.readings)
  }
}

class Exercise {
  constructor(type) {
    this.status = 'pending'
    this.type = type
  }
}

export class PickOneOption {
  constructor(display, question) {
    this.display = display
    this.question = question
  }
}

export class PickOneExercise extends Exercise {
  constructor(options) {
    super('PickOne')
    this.options = options
  }

  ask() {
    let answer = _.sample(this.options)

    return {
      options: this.options.map(o => o.display),
      question: answer.question,
      answer: answer.display
    }
  }
}
