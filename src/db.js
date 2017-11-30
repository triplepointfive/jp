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

  toPickOneOption() {
    return new PickOneOption(this.display(), [this.meaning(), this.reading()])
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
    this.type = type
  }
}

export class PickOneOption {
  constructor(display, questions) {
    this.display = display
    this.questions = questions
  }
}

export class PickOneExercise extends Exercise {
  constructor(options, question, answer) {
    super('PickOne')
    this.options = options
    this.question = question
    this.answer = answer
  }
}

export class Builder {
  static pickOneExercises (options) {
    const pickOptions = options.map(o => o.toPickOneOption())
    const displayOptions = pickOptions.map(o => o.display)

    let exercises = []

    // TODO: concat map
    pickOptions.forEach((o) => {
      o.questions.forEach((q) => {
        exercises.push(
          new PickOneExercise(
            displayOptions,
            q,
            o.display
          )
        )
      })
    })

    return exercises
  }
}

export class Lesson {
  constructor(exercises) {
    this.exercises = _.flatten(exercises)
  }
}

export class Session {
  constructor(lesson) {
    this.exercises = _.shuffle(lesson.exercises)

    this.total = this.exercises.length

    this.done = 0
  }

  next () {
    const exerciseToRepeat = this.exercises.shift()
    this.exercises.push(exerciseToRepeat)
    return this.exercise()
  }

  success () {
    this.exercises.shift()
    this.done += 1
  }

  completed () {
    return this.done === this.total
  }

  exercise () {
    return this.exercises[0]
  }
}
