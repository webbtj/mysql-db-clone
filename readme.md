This script clones one mysql database to another, optionally doing a
find and replace on text. To use, first configure the config.json file.

There are two main objects, `remote_db` and `local_db`. Each of these have
4 required members:
1. `name` (the name of the database)
2. `host` (the host of the database)
3. `user` (the username for the database connection)
4. `pass` (the password for the database connection)

`remote_db` also has an optioanl `sed_find` member, where `local_db` has
`sed_replace`. If these are both set the script will replace occurances 
of `remote_db.sed_find` with `remote_db.sed_replace`. Remember that this
is sed, so the expressions are regex AND your are within a string,
so double escaping is required (mysite.com would be `mysite\\.com`)

The package comes with a sample config, you'll need to rename this or
make your own config.json

The intent of this is for devs who are working on a site and would
normally use a remote db connection but that is too slow and the
manual syncing process is too cumbersome. Setup the config and just run
`node clone.js` and it will take care of all the leg work.

Enjoy!