/**
 * Used to determine what versions belongs to what Wordpress project
 *
 * @author jordanskomer
 */
export class Project {
  /**
   * This contains the ID of the project which is created using a
   * reverseTimestamp_projectname format to sort them by creation date
   *
   * Note you would access using the id getter as this is set in the constructor
   *
   * @author jordanskomer
   */
  private _id: string;


  get id(): string {
    return this._id;
  }
}
