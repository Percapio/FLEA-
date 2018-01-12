declare var require : any;
declare var module : any;

const fb     = require('firebase'),
      fetch  = require('fetch').fetchUrl;

//*** Config Firebase */
const config = {
  apiKey: "AIzaSyAEHSPRcDAzru_95S8TAqMLLRYkU-pkZMM",
  authDomain: "gate-is-down.firebaseapp.com",
  databaseURL: "https://gate-is-down.firebaseio.com",
  projectId: "gate-is-down",
  storageBucket: "",
  messagingSenderId: "923810443103"
};
/* temporarily removed */

//*** Initialize Firebase */
const firebase = fb.initializeApp(config),
            db = firebase.database();
        // userId = fb.auth().currentUser.uid;

module.exports = {   
  checkAndReturn(seperateData, makeBoard, music) {
    const getHackers : Array<any> = db.ref().child('hackers');

    getHackers.once('value')
      .then(data => {
        seperateData(data.val());
        makeBoard();
        music.play();
      })
      .catch(error => console.log(error));
  },

  inputInitials() {
    console.log('BBB')
  },

  userPosition() {
    console.log('last place')
  },

  topThreePlayers() {
    console.log('{ Dude, Bob, George }')
  },
};

const grabData = () => {
  fetch('https://cdn.rawgit.com/MISP/misp-galaxy/master/clusters/threat-actor.json',
      (error: any, meta: any, body: any) => {
        const data    : Array<any> = JSON.parse(body.toString()).values;
        let actorId   : number = 0;
        let webId     : number = 0;
        let webArray  : Array<any> = [];
        let actorArray: Array<any> = [];

        for (let i=0; i < data.length; i++) {
          const websites    : Array<string> = data[i].meta.refs;
          let   country     : string = data[i].meta.country || 'unknown';
          let   actorObject : any;
          
          if (typeof websites != 'undefined') {
            let checker : boolean = false;

            actorObject =  {
              id: actorId,
              name: data[i].value,
              country: country,
            };
            
            websites.forEach( website => {
              let   webObject   : any;
              
              if (typeof website != 'undefined') {
                webObject = {
                  id: webId,
                  url: website,
                  actor: actorId
                };

                webArray.push(webObject);
                webId += 1;
                checker = true;
              }
            });
            
            if (checker) {
              actorArray.push(actorObject);
              actorId += 1;
            }
          }
        }

        db.ref().child('websites').set(webArray);
        db.ref().child('hackers').set(actorArray);
      }
    )
}