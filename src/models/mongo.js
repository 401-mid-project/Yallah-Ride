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

  get(info){
    if(info){
      console.log('get hiii', info);
      return this.schema.find(info.name);
    }else{
      return this.schema.find({});
    }
  }

  update(_id , data){
    return this.schema.findByIdAndUpdate(_id , data , {new : true});
  }

  delete(_id){
    return this.schema.findOneAndDelete(_id);
  }

};