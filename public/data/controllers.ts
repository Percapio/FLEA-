declare var require : any;
declare var module : any;

const fb     = require('firebase'),
      fetch  = require('fetch').fetchUrl;

//*** Config Firebase */
// Please don't steal my ID
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

  grabScores(level: number, renderScoreboard) {
    const people : Array<any> = db.ref().child(level.toString());

    people.once('value')
      .then( data => {
        let topThree = grabTopThree(Object.values(data.val()));
        let orderedThree = orderTopThree(topThree);
        renderScoreboard(orderedThree);
      })
      .catch( error => console.log(error));
  },

  userPosition() {
    console.log('last place')
  },

  makeScore(data: any, level: number) {
    db.ref().child(level).push({ person: data });
  },
};

interface Numbers {
  person : {
    intials : string,
    time : {
      milliseconds: number,
      minutes: number,
      seconds: number,
    }
  }
}

interface Person {
  intials : string,
  time    : {
    milliseconds : number,
    minutes : number, 
    seconds : number,
  }
}

const orderTopThree = (people: Array<any>) => {
  for (let i=0; i < 2; i++) {
    let personA : Person = people[i];

    for (let j=1; j < 3; j++) {
      let personB : Person = people[j];

      if (personA.time.seconds > personB.time.seconds) {
        let tradePerson = personA;
        personA = personB;
        personB = tradePerson;
      } else if (personA.time.milliseconds > personB.time.milliseconds && personA.time.seconds === personB.time.seconds) {
        let tradePerson = personA;
        personA = personB;
        personB = tradePerson;
      }

      people[i] = personA;
      people[j] = personB;
    }
  }

  return people;
}

const grabTopThree = (people: Array<any>) => {
  let results = [];

  for (let j=0; j < people.length; j++) {
    let person : Person = people[j].person;

    if (results.length < 3) {
      results.push(person);
    } else {
      let seconds : number = person.time.seconds,
      milliseconds: number = person.time.milliseconds;

      for (let i=0; i < 3; i++) {
        if (seconds < results[i].person.time.seconds) {
          results = results.splice(i, 1, person);
        } else if (milliseconds < results[i].person.time.seconds && seconds === results[i].person.time.seconds) {
          results = results.splice(i, 1, person);
        }
      }
    }
  }
  return results;
}

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