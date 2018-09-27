import { File } from "./file";

export class Version {
  /**
   * The format of the id is reversedtimestamp_md5token
   * We set the reversed timestamp first so the are returned
   * in asc order by the date they were created.
   *
   * @author jordanskomer
   */
  public _id: string;
  /**
   * The id of the project that is on the users' table.
   * This is used to form the file paths
   *
   * @author jordanskomer
   */
  public project: number;
  /**
   * The email address of the user who created this version
   *
   * @author jordanskomer
   */
  public owner: string;
  /**
   * If the array is empty we can assume the version can
   * be accessed by anyone with the MD5 hash or link. If there are
   * emails in the array, only emails in the array can access the version
   */
  public access: string[];
  /**
   * The database file for this versions code
   *
   * @author jordanskomer
   */
  public db: File;
}