/**
 * Global methods and variables that exist on every model used in Kohkane
 *
 * @author jordanskomer
 */
export class Model {
  /**
   * The id of the model
   *
   * @author jordanskomer
   */
  public id: string;
  /**
   * UTC timestamp for when an object was inserted into the DB
   *
   * @author jordanskomer
   */
  public createdDate: number;
  /**
   * UTC timestamp for when an object was last updated in the DB
   */
  public lastModifiedDate: number;
  /**
   * Assigns the created date and last modified date for every model.
   * Only assigns the created date if we are creating a new project
   *
   * @param createdDate - passed in created date
   */
  constructor(isNew: boolean, createdDate?: number) {
    if (isNew) { this.createdDate = createdDate ? createdDate : new Date().getTime(); }
    this.lastModifiedDate = new Date().getTime();
  }
  /**
   * Used to convert a model's variables into an object
   * Useful for communicating with dynamodb through models
   *
   * @author jordanskomer
   */
  public toObject(): {} {
    const obj = {};
    Object.keys(this).reverseIterate((key) => {
      obj[key] = this[key];
    });
    return obj;
  }
  /**
   * Goes through every key in the model and performs an action on each item
   *
   * @param callback - The function to perform on each item
   * @author jordanskomer
   */
  public getItem(callback: (value: any, key?: any) => any): void {
    Object.keys(this).reverseIterate((key) => {
      callback(this[key], key);
    });
  }
}
