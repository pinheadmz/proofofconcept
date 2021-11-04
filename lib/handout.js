'use strict';

const Path = require('path');
const Logger = require('blgr');
const Config = require('bcfg');

const Webserver = require('./webserver');

const config = new Config('handout');
config.prefix = '';
config.parseArg();
config.open(Path.join(__dirname, '..', 'conf', 'handout.conf'));

const html = Path.join(__dirname, '..', 'html');
const logger = new Logger();
logger.set({
  level: 'debug',
  console: true,
  file: false
});

const webserver = new Webserver({
  domain: config.str('domain', 'proofofconcept'),
  host: config.str('host', 'proofofconcept'),
  test: config.bool('test', false),
  html,
  logger
});

(async () => {
  await logger.open();
  await webserver.init();
})().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
