export default class Achievement {

  /**
   * 
   * @param {string} desc Description of Achievement
   * @param {Date} date Date achievement happened
   */
  constructor(desc, date) {
    this.desc = desc;
    this.date = date;
    console.log('Achievement created:',this);
  }

  toString() {
    return JSON.stringify(this);
  }
}