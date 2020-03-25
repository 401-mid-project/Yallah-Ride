'use strict';


module.exports = class Mongo {

  constructor(schema){
    this.schema = schema;
  }



  create(data){
    let newData = new this.schema(data);
    console.log('mongo response>> data ==>', newData);
    return newData.save();
  }

  get(data){
    if(data){
      console.log('true');

      console.log('get hiii', data);
      return this.schema.find({'info.name' : data });
    }else{
      console.log('false');
      return this.schema.find({});
    }
  }

  getById(id){
    if(id){
      console.log('Get DaTa', id);
      return this.schema.find({_id : id});
    }else{
      return this.schema.find({});
    }
  }


  update(_id , data){
    return this.schema.findByIdAndUpdate(_id , data , {new : true});
  }

  // add offer to the array
  addOffer(id , data){
    return this.schema.findByIdAndUpdate({_id : id} , { $addToSet: { 'drives': data} });
  }

  delete(_id){
    return this.schema.findOneAndDelete(_id);
  }

};