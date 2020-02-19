'use strict';

const {server} = require('../src/lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server) ;
const users = require('../src/models/users.js');



// ready to test the routes 
describe('Test middleware' , () => {


  it('404 works' , ()=> {
    return mockRequest.get('/nothing')
      .then(data => {
        expect(data.status).toBe(404);
      });
  });


  it('timeStamp middleware works !', () => {
    return mockRequest
      .get('/timeStamp')
      .then(result => {
        expect(typeof result.text).toEqual('string');
      })
      .catch(console.error);
  });

  it('Responds 500 Error', () => {
    return mockRequest
      .get('/dashboard' )
      .then(result => {
        expect(result.status).toBe(500);
      })
      .catch(console.error);
  });

});


describe('API TEST', () => {

  let token ;
  let user = {info:{name:'dante' , password:'12345'}};

  async function generate(data){
    token = await users.tokenGenerator(data);
  } 


  beforeEach(()=>{
    generate(user);
  });

  it('/pickups route worked with Auth !' , ()=> {
    return mockRequest.get('/pickups')
      .set('Authorization' ,'Bearer ' + token)  
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/passengers route worked with Auth !' , ()=> {
    return mockRequest.get('/passengers')
      .set('Authorization' ,'Bearer ' + token)  
      .then(data => {
        expect(data.status).toBe(200);
      });
  });

  it('/dashboard route worked with Auth !' , ()=> {
    return mockRequest.get('/dashboard')
      .set('Authorization' ,'Bearer ' + token)  
      .then(data => {
        expect(data.status).toBe(200);
      });
  });



  it('Sign-up  Works' , ()=> {
    let newVal = { info:{name: 'DanTe' , password: '12345'}};
    return mockRequest.post('/signup')
      .send(newVal)
      .then(data => {
        expect(data.status).toBe(200);
        expect(typeof data.res.text).toEqual('string');
      });
  });


  //   it('delete works' , ()=> {
  //     let newVal = { name: 'DanTe'};
  //     return mockRequest.post('/api/v1/categories')
  //       .send(newVal)
  //       .then(data => {
  //         return mockRequest.delete(`/api/v1/categories/${data.body._id}`)
  //           .then(data => {
  //             return mockRequest.get(`/api/v1/categories/${data.body._id}`)
  //               .then(data => {
  //                 expect(data.status).toBe(200);
  //                 expect(data.body[0]).toBe(undefined);
  //               });
  //           });
  //       });
  //   });


}) ;
