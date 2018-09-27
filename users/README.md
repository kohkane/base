# users/
Defines all of the user functionality need by Kohkane. NOTE: Authentication is handled by the

### Paths
*GET - user?id,email*
Returns a user that matches the passed in query
*PATCH - user?id,email*
Updates the user that matches the passed in query
*DELETE - user?id,email*
Deletes the user that matches the passed in query
*POST - users/new*
Create a new user
