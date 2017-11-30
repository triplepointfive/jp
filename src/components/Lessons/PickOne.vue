<template lang="slm">
  .question-node
    .head
      h1.first-letter v-text="question"
    .body
      b-row[
        v-for="row in collection"
        :key="row.join()"
        ]
        b-col[
          cols="6"
          v-for="kanji in row"
          :key="kanji"
          ]
          b-card.text-center[
            :border-variant="pickedColor(kanji)"
            @click="pick(kanji)"
            ]
            h1.kanji.display-1 v-text="kanji"

            b-form-radio.picked[
              v-model="picked"
              :value="kanji"
              plain
              name="option"
              ]
    .footer
      b-btn.submit.first-letter[
        :disabled="!picked"
        variant="success"
        @click="check"
        v-text="buttonText"
        ]
</template>

<script>
import _ from 'lodash'

export default {
  props: ['kanjis', 'question', 'answer'],
  data() {
    return {
      collection: this.buildCollection(),
      picked: null,
      done: false,
      correct: null
    }
  },
  methods: {
    buildCollection() {
      let [v1, v2, v3, v4] = _.shuffle(this.kanjis, { copy: true })
      return [[v1, v2], [v3, v4]]
    },
    check() {
      if (this.done) {
        this.$emit('done')
      } else {
        this.correct = this.answer === this.picked
        this.done = true
        this.$emit('track', this.correct)
      }
    },
    pick(kanji) {
      if (!this.done) {
        this.picked = kanji
      }
    },
    pickedColor(kanji) {
      // TODO: Colorize input[type=option] as well
      if (!this.done) {
        return this.picked === kanji ? 'primary' : 'dark'
      }

      if (this.correct) {
        return this.picked === kanji ? 'success' : 'dark'
      }

      if (this.picked === kanji) {
        return 'danger'
      }

      if (this.answer === kanji) {
        return 'success'
      }

      return 'dark'
    }
  },
  computed: {
    buttonText() {
      return this.done ? 'next' : 'submit'
    }
  }
}
</script>

<style lang="stylus">
.question-node {
  .first-letter {
    text-transform: capitalize;
  }

  > .head {
    height: 10%;
    width: 100%;
  }

  > .footer {
    height: 10%;
    width: 100%;

    > .submit {
      width: 80%;
    }
  }

  > .body {
    height: 80%;
    width: 100%;

    > .row {
      height: 40%;
      margin-bottom: 10%;

      .card {
        width: 100%;
        height: 100%;
        display: inline-block;
        border-width: 2px;
        position: relative;

        &.border-danger {
          .custom-control-input:checked ~ .custom-control-indicator {
            background-color: #dc3545 !important;
          }
        }

        &.border-success {
          .custom-control-input:checked ~ .custom-control-indicator {
            background-color: #28a745 !important;
          }
        }

        .kanji {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .picked {
          position: absolute;
          left: 0.5em;
          bottom: 0.5em;
          margin: 0;
        }
      }
    }
  }
}
</style>
