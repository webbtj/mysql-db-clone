var path = require('path');
var c = require( path.join(__dirname, 'config.json') );

var exec = require('child_process').exec;

function get_remote_db(){
    console.log('Getting remote DB...');
    exec(
        'mysqldump ' + c.remote_db.name + ' --host=' + c.remote_db.host + ' --user=' + c.remote_db.user + ' --password=' + c.remote_db.pass + ' > /tmp/dump.sql',
        function(error, stdout, stderr) {
            if(!error){
                console.log('...done getting remote DB!');
                find_replace();
            }else{
                console.log(stderr);
            }
        }
    );
}

function find_replace(){
    if(c.remote_db.sed_find && c.local_db.sed_replace){
        console.log('Replacing `' + c.remote_db.sed_find + '` with `' + c.local_db.sed_replace + '` ...');
        exec(
            'sed -i \'.bak\' \'s/' + c.remote_db.sed_find + '/' + c.local_db.sed_replace + '/g\' /tmp/dump.sql ',
            function(error, stdout, stderr) {
                if(!error){
                    console.log('...done replacing `' + c.remote_db.sed_find + '` with `' + c.local_db.sed_replace + '`!');
                    import_local_db();
                }else{
                    console.log(stderr);
                }
            }
        );
    }else{
        import_local_db();
    }
}

function import_local_db(){
    console.log('Importing local DB...');
    exec(
        'mysql < /tmp/dump.sql ' + c.local_db.name + ' --host=' + c.local_db.host + ' --user=' + c.local_db.user + ' --password=' + c.local_db.pass + '',
        function(error, stdout, stderr){
            if(!error){
                console.log('...done importing local DB!');
                delete_tmp_file();
            }else{
                console.log(stderr);
            }
        }
    );
}

function delete_tmp_file(){
    console.log('Deleting temp file...');
    exec(
        'rm -rf /tmp/dump.sql /tmp/dump.sql.bak',
        function(error, stdout, stderr){
            if(!error){
                console.log('...done deleting temp file');
                console.log('Done!');
            }else{
                console.log(stderr);
            }
        }
    );
}

get_remote_db();