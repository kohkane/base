/**
 * Used for holding collection of files (i.e. media or plugins)
 *
 * @author jordanskomer
 */
export class Filelist {
  /**
   * The total size in bytes of all of the files
   *
   * @author jordanskomer
   */
  public totalSize: number;
  /**
   * The collection of files
   *
   * @author jordanskomer
   */
  public files: File[];
}
/**
 * This defines the model structure for file storage and retrieval.
 * File paths are defined using the structure below and therefore do not need to be
 * included in the dataset.
 *
 * File Path Format: /projectId/versionId/name
 * Note: If the version field is set in the object it will use that id instead of the
 *       id pulled from the version table
 *
 * @author jordanskomer
 */
export class File {
  /**
   * The name of the file
   *
   * @author jordanskomer
   */
  public name: string;
  /**
   * The size in bytes of the file
   *
   * @author jordanskomer
   */
  public size: number;
  /**
   * The version where this file can be found. Used for
   * preventing duplicate file upload and to save on storage space
   *
   * @author jordanskomer
   */
  public version?: string;
}
