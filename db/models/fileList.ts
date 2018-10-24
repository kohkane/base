import { File } from './file';

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
