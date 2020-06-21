class Lobby {
  constructor () {
    this.players = []
  }

  join(player) {
    if(this.players.length > 1) return false

    return this.players.push(player)
  }

  isFull() {
    return this.players.length === 2
  }
}

export default new Lobby()
