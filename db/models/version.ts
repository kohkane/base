import { File, Filelist } from "./file";

/**
 * Used to track the state of the current version. Helpful for
 * showing loading animations and knowing when a version's upload is completed
 *
 * @author jordanskomer
 */
enum VersionStatus {
  /**
   * When a version is being uploaded
   *
   * @author jordanskomer
   */
  in_progress,
  /**
   * When a version is ready to be interfaced with
   *
   * @author jordanskomer
   */
  complete,
}
/**
 * The main event. This is how we keep track of all of the files and sharing permission
 * for every version created.
 *
 * @author jordanskomer
 */
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
   *
   * @author jordanskomer
   */
  public access: string[];

  public
  /**
   * The database file for this versions code
   *
   * @author jordanskomer
   */
  public db: File;
  /**
   * The plugins that are in this version
   *
   * @author jordanskomer
   */
  public plugins: Filelist;
  /**
   * The media files that are in this version
   *
   * @author jordanskomer
   */
  public media: Filelist;
}
