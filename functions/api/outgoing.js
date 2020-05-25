'use strict';
// ---------------------------------------------------------------------------
// [START functionsimport]

const functions = require('firebase-functions');
const admin = require('firebase-admin');
try {admin.initializeApp(functions.config().firebase);} catch(e) {} // You do that because the admin SDK can only be initialized once.
var db = admin.firestore();

// [END functionsimport]
// ---------------------------------------------------------------------------
// [START additionalimports]

const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const twilio = require('twilio');

// [END additionalimports]
// ---------------------------------------------------------------------------
// [START helpers]


// [END helpers] 
// ---------------------------------------------------------------------------
// [START functions] 

/* 
 * 
 *
 */ 

exports = module.exports = functions.https.onRequest((request, response) => {
  console.log(request.body)

  var cid_number = functions.config().twilio.cid;
  var destination = request.body.Called
  var twiml = new twilio.twiml.VoiceResponse();
  
  if (typeof destination !== 'undefined') {
    destination = destination.split("@")[0].split("sip:")[1]
    var call_attributes = {
        "timeout":functions.config().twilio.timeout, 
        "callerId":cid_number, 
        "record":"record-from-answer",
        "transcribe":"true",
    }

    const dial = twiml.dial(call_attributes)
    dial.number(destination)

  }else{
    twiml.say("Invalid number");
  }
  
  console.log(twiml.toString());
  
  response.set('content-type', 'text/xml');
  response.send(twiml.toString());

 
})

// [END functions]
// ---------------------------------------------------------------------------