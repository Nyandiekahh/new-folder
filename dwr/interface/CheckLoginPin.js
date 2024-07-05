
// Provide a default path to dwr.engine
if (typeof this['dwr'] == 'undefined') this.dwr = {};
if (typeof dwr['engine'] == 'undefined') dwr.engine = {};

if (typeof this['CheckLoginPin'] == 'undefined') this.CheckLoginPin = {};

CheckLoginPin._path = '/KRA-Portal/dwr';

CheckLoginPin.checkLoginPin = function(p0, callback) {
  dwr.engine._execute(CheckLoginPin._path, 'CheckLoginPin', 'checkLoginPin', p0, callback);
};


