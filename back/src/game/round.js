export default class Round {
  constructor () {
  }

  async start() {
    return new Promise(r => {
      setTimeout(() => {
        r("ABC")
      }, 3000)
    })
  }
}
