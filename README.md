# Gate is Down

  [LIVE on Firebase.com](https://gate-is-down.firebaseapp.com/)

#### Summary

  You must flee!!  Time is running out! There is only 30 seconds left, and you must reach safety.  Head towards the gate, but watch out for the Hackers in Space!  Each time you fire your forward or reverse thrusters, they can sense you and they will come in droves.  So, move swiftly, but glide safely to freedom.

#### Game Design
  1. User control and interactions
  2. Computer AIs are generated via a web-scraping function
  3. Cloud database that stores users scoreboard and AI JSON information
  3. Collision implementation
  6. Interactive win, lose, and pause

---
###### Technologies
  + NodeJS
  + Firebase
  + Canvas

###### Languages
  + JavaScript
  + TypeScript

###### Dependencies
  + [Fetch](https://www.npmjs.com/package/fetch)

---
#### Coming Soon...
  + Additional web-scraping functions for bigger and badder Hackers in Space
  + Additional levels
  + Larger maps, and a smoother experience

---
#### Improvements in code

A simple fix to improve the time complexity of Gate is Down.  

Before, what we had were two seperate functions, each an O(n^2) time complexity to grab and sort the top three players in the scoreboard database.  With only a few people, it didn't matter as much, but concerning scalibility it becomes even incredibly important to write code that would reduce the time necessary for essential components and extra features to load. 

Nobody's got time for loading screens these days.

```
const grabTopThree = (dataOfPeople: Array<any>) : any=> {
  let results  : Array<any> = [];

  for (let j=0; j < dataOfPeople.length; j++) {
    let person : Person = dataOfPeople[j].person;

    if (results.length < 3) {
      results.push(person);
    } else {
      let seconds : number = person.time.seconds,
      milliseconds: number = person.time.milliseconds;


// Notice the nested for loops: hence the O(n^2) time complexity
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

const orderTopThree = (topThree: Array<any>) : any => {
  for (let i=0; i < 2; i++) {
    let personA : Person = topThree[i];


// Same for here, more nesting of for loops
    for (let j=1; j < 3; j++) {
      let personB : Person = topThree[j];

      if (personA.time.seconds > personB.time.seconds) {
        let tradePerson = personA;
        personA = personB;
        personB = tradePerson;
      } else if (personA.time.milliseconds > personB.time.milliseconds && personA.time.seconds === personB.time.seconds) {
        let tradePerson = personA;
        personA = personB;
        personB = tradePerson;
      }

      topThree[i] = personA;
      topThree[j] = personB;
    }
  }

  return topThree;
}
```

To overcome this, we implement the equation many of us have learned in the early days of coding: a merge sort.  The magical algorithm that, at first glance, makes absolutely no sense, but in time becomes appreciated for its simplistic way of resolving a problem.  In this case, reducing the time complexity from O(n^2) to O(nlogn).

```
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
```

Afterwards we follow up with a splice function to grab the number of players we want from the now sorted array.

```
const topFivePeople = (people : Array<any>) : any => {
  return people.slice(0, 4);
}