/**
 * Used to determine what versions belongs to what Wordpress project
 *
 * @author jordanskomer
 */
export class Project {
  public id: string;
  public name: string;
  public owner: string;
  public createdDate: number;

  constructor(name: string, owner: string, createdDate?: number) {
    this.id = name.sanatize();
    this.createdDate = createdDate ? createdDate : new Date().getTime();
    this.name = name;
    this.owner = owner;
  }
}
