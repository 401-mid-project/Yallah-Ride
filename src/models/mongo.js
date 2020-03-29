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

  //add offer message
  addOfferMessage(id , data){
    return this.schema.findByIdAndUpdate({_id : id} , { $addToSet: { 'offerMessages': data} });
  }

  //update pending Messages for offer
  updatePendingMessagesOffer(id , data){
    return this.schema.updateOne({'pendingMessages.offerId' : id },
      { '$set' : {'pendingMessages.$.messageState': data} });
  }

  //update offer booked Messages for offer
  updateOfferBookedState(id , data){
    return this.schema.updateOne({'offerMessages.offerId' : id },
      { '$set' : {'offerMessages.$.booked': data} });
  }
  
  //update drives booked state
  updateDrivesBookedState(id , data){
    return this.schema.updateOne({'drives.offerId' : id },
      { '$set' : {'drives.$.booked': data} });
  }

  // delete offer message if declined
  deleteOfferMessage(reqId , offerId){
    return this.schema.updateOne({ _id: reqId },{'$pull': { 'offerMessages': {'offerId': offerId}}});
  }
  






  //add to pendingMessages
  addPendingMessages(id , data){
    return this.schema.findByIdAndUpdate({_id : id} , { $addToSet: { 'pendingMessages': data} });
  }





  // add ask to the array
  addAsk(id , data){
    return this.schema.findByIdAndUpdate({_id : id} , { $addToSet: { 'rides': data} });
  }

  //add ask message
  addAskMessage(id , data){
    return this.schema.findByIdAndUpdate({_id : id} , { $addToSet: { 'askMessages': data} });
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

  // delete ask message if declined
  deleteAskMessage(reqId , askId){
    return this.schema.updateOne({ _id: reqId },{'$pull': { 'askMessages': {'askId': askId}}});
  }

  // db.collection.update({"_id":0},{"$pull":{"scores":{score: 6.676176060654615}}})


  
  delete(_id){
    return this.schema.findOneAndDelete(_id);
  }

};