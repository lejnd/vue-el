require('shelljs/global');

exec('apimocker --config ./mock/mock-config.json', function(status, output) {
});
