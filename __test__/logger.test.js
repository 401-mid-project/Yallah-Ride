'use strict';

const logger = require('../src/middleware/logger.js');

describe('Test Middleware Logger' , () => {
  let consoleSpy ;
  let req = {} ;
  let res = {} ;
  let next = jest.fn(); // ?? spy on next method ??

  beforeEach(() => {
    consoleSpy = jest.spyOn(console , 'log').mockImplementation();
        
  });

  afterEach(() => {
    consoleSpy.mockRestore() ;
  });


  it('logs some output' , () => {
    logger(req , res , next);
    
    expect(consoleSpy).toHaveBeenCalled();
  });
  // toHaveBeenCalled() is not enough, we need to make sure it was called with no args
  it('properly moves to the next middleware', () => {
    logger(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });



});
