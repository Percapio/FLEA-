declare var require : any;
declare var module : any;

const fb      = require('firebase'),
      fetchUrl= require('fetch');

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
    const getHackers : any = db.ref().child('hackers');

    getHackers.once('value')
      .then(data => {
        seperateData(data.val());
        makeBoard();
        music.play();
      })
      .catch(error => console.log(error));
  },

  grabScores(level: number, renderScoreboard) {
    const people : any = db.ref().child(level.toString());

    people.once('value')
      .then( data => {
        let arrayOfPeeps : Array<any> = Object.values( data.val() );
        let sortedPeople : Array<any> = mergeSort( arrayOfPeeps );
        let topFive      : Array<any> = topFivePeople( sortedPeople );

        renderScoreboard( topFive );
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

const mergeSort = (people : Array<any>) : any => {
  if (people.length === 1) {
    return people;
  }

  const midIdx    : number     = Math.floor(people.length / 2);
  const midPerson : Array<any> = people[ midIdx ];

  const mergeLeftPeople  : Array<any> = people.slice(0, midIdx);
  const left             : Array<any> = mergeSort( mergeLeftPeople );

  const mergeRightPeople : Array<any> = people.slice(midIdx);
  const right            : Array<any> = mergeSort( mergeRightPeople );

  let sortedPeople : Array<any> = merge( left, right );
  return sortedPeople;
}

const merge = (left : Array<any>, right : Array<any>) : any => {
  let sortedPeople  : Array<any> = [];

  if (typeof left === 'undefined') {
    return right;
  } else if (typeof right === 'undefined') {
    return left;
  }

  while (left.length > 0 && right.length > 0) {
    let personA : any = left[0].person;
    let personB : any = right[0].person;

    if (personA.time.seconds > personB.time.seconds) {
      sortedPeople.push( left.shift() );
    
    } else if (personA.time.seconds === personB.time.seconds) {
      if (personA.time.milliseconds > personB.time.milliseconds) {
        sortedPeople.push( left.shift() );
      }
    } else {
      sortedPeople.push( right.shift() );
    }
  }

  sortedPeople = sortedPeople.concat(left, right);
  return sortedPeople;
}

const topFivePeople = (people : Array<any>) : any => {
  return people.slice(0, 4);
}

const grabData = () : void => {
  fetchUrl.fetchUrl('https://cdn.rawgit.com/MISP/misp-galaxy/master/clusters/threat-actor.json',
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