import { Stripe } from "./stripe";
/**
 * Used to add security and ease to the user's login and session
 * authentication.
 *
 * Might not need this
 *
 * @author jordanskomer
 */
class IP {
  /**
   * The IPv4 or IPv6 address
   *
   * @author jordanskomer
   */
  public _ip: string;
  /**
   * The date this ip was accessed
   */
  public date: number;
}

/**
 * Defines all of the structure for the users table. This is where all
 * user specific information lives.
 *
 * Table Name: projectenv-users
 *
 * @author jordanskomer
 */
export class User {
  /**
   * The user's email address lowercase
   *
   * @author jordanskomer
   */
  public _email: string;
  /**
   * The user's first name
   *
   * @author jordanskomer
   */
  public fname?: string;
  /**
   * The user's last name
   *
   * @author jordanskomer
   */
  public lname?: string;
  /**
   * The user's phone in digit form. Use the methods
   * for formatting the number
   *
   * @author jordanskomer
   */
  public phone?: number;
  /**
   * Contains all of the user's payment and current plan information.
   * See stripe.ts for more info
   *
   * @author jordanskomer
   */
  public stripe: Stripe;
}
