import Achievement from "./Achievement";


export default class Goal {

  /**
   * 
   * @param {string} uid UID of redux user
   * @param {string} name Name of goal
   * @param {Date} startDate Start date of goal
   * @param {string} importance Importance level of goal (low, medium, high)
   * @param {Achievement} firstAchievement Created when goal is set
   * @param {boolean} [achieved=false] Whether goal is achieved or not
   * @param {Date} [endDate=null] End date of goal
   * @param {string} [desc=null] Optional description of goal
   */
  constructor(uid, name, startDate, importance, firstAchievement, desc=null, endDate=null, achieved=false) {
    this.uid = uid;
    this.name = name;
    this.startDate = startDate;
    this.importance = importance;  
    this.achievements = [firstAchievement]; 
    this.desc = desc;
    this.endDate = endDate;
    this.achieved = achieved;
    console.log('Goal created:',this);
  }

  toString() {
    return JSON.stringify(this);
  }
}