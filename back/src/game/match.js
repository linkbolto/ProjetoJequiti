import Round from './round.js'

export default class Match {
  constructor (player1, player2) {
    this.player1 = player1
    this.player2 = player2
    this.rounds = this.generateRounds()
  }

  async generateRounds () {
    const a = new Round()
    const b = await a.start()
    console.log("retornou:", await b)
  }
}
