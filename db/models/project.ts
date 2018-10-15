/**
 * Used to determine what versions belongs to what Wordpress project
 *
 * @author jordanskomer
 */
export class Project {
  public id: string;
  public name: string;
  public owner: string;

  constructor(name: string, owner: string) {
    this.id = `${new Date().getTimeReversed()}_${name.sanatize()}`;
    this.name = name;
    this.owner = owner;
  }
}
