import { Model } from './model';

/**
 * Used to determine what versions belongs to what Wordpress project
 *
 * @author jordanskomer
 */
export class Project extends Model {
  public name: string;
  public owner: string;

  constructor(
    public fields?: {
      createdDate?: number,
      id?: string,
      name?: string,
      owner?: string,
    },
    public isNew?: boolean,
  ) {
    super(isNew, fields.createdDate);
    if (fields.name) { this.name = fields.name; }
    if (fields.owner) { this.owner = fields.owner; }
    if ((isNew && fields.name) || (!isNew && fields.id)) { super.id = fields.id ? fields.id : fields.name.sanatize(); }
  }
}
