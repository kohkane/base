import { Stripe } from "./stripe";

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
   * The user's email address lowercase if they have signed up
   * Random MD5 string if they have not yet signed up
   *
   * @author jordanskomer
   */
  private _id: string;
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
   * for formatting the number. Used for 2FA
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
  public stripe?: Stripe;
  /**
   * Creates a new user record
   *
   * @param newUser - The User object to create
   * @param email - The user's email (defaulted to blank)
   * @author jordanskomer
   */
  constructor(
    newUser: User,
    email = ''
  ) {
    this.assignId(email)
    Object.assign(this, newUser);
  }
  /**
   * Returns the user's private id
   *
   * @author jordanskomer
   */
  public get id(): string {
    return this._id;
  }
  /**
   * Assigns the _id. Sanatizes the email if it isn't blank. Otherwise
   * it will create a unique ID
   *
   * @param email - Blank if no email was provided
   */
  private assignId(email): void {
    this._id = email ? email : generateID();
  }
}
