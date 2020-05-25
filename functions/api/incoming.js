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
  var twiml = new twilio.twiml.VoiceResponse();
  var call_attributes = {
        "record":"record-from-answer",
        "transcribe":"true",
        "timeout":functions.config().twilio.timeout,
  }
  var destination = functions.config().twilio.sip.destination;
  twiml.dial(call_attributes).sip(destination)
  response.set('content-type', 'text/xml');
  response.send(twiml.toString());
})

// [END functions]
// ---------------------------------------------------------------------------