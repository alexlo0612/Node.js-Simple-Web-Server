//Require Dependency
const assert = require('assert');
//Import Test Files
const User = require('../src/user');
//Start Test (Major Block) awefwegsssssssdfasds
describe('Creating DB Records', () => {
  //Test Subblock
  it('Save User', () => {
    //assert(1 + 1 === 2);
    const userInstance = new User({
      name: 'Joe'
    });
    userInstance.save();
  });
});