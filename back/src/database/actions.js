import {PowerUps} from './index.js'

export default async function findPowerUp(powerUpNumber) {

  return await PowerUps.findOne({ power: `power${powerUpNumber}` }).exec();

}
