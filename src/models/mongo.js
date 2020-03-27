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

  // add ask to the array
  addAsk(id , data){
    return this.schema.findByIdAndUpdate({_id : id} , { $addToSet: { 'rides': data} });
  }

  //add ask message
  addAskMessage(id , data){
    return this.schema.findByIdAndUpdate({_id : id} , { $addToSet: { 'askMessages': data} });
  }

  //add to pendingMessages
  addPendingMessages(id , data){
    return this.schema.findByIdAndUpdate({_id : id} , { $addToSet: { 'pendingMessages': data} });
  }

  //update pending Messages
  updatePendingMessages(id , data){
    return this.schema.updateOne({'pendingMessages.askId' : id },
      { '$set' : {'pendingMessages.$.messageState': data} });
  }

  //update ask booked Messages
  updateAskBookedState(id , data){
    return this.schema.updateOne({'askMessages.askId' : id },
      { '$set' : {'askMessages.$.booked': data} });
  }

  //update rides booked state
  updateRidesBookedState(id , data){
    return this.schema.updateOne({'rides.askId' : id },
      { '$set' : {'rides.$.booked': data} });
  }
  

  //   Person.update({'items.id': 2}, {'$set': {
  //     'items.$.name': 'updated item2',
  //     'items.$.value': 'two updated'
  // }}, function(err) { ...


  delete(_id){
    return this.schema.findOneAndDelete(_id);
  }

};