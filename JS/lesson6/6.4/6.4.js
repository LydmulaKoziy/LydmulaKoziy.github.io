function compareAge(nameA, nameB) {
    return nameA.age - nameB.age;
}


var vasya = { name: "Вася", age: 23 };
var masha = { name: "Маша", age: 18 };
var vovochka = { name: "Вовочка", age: 6 };

var people = [ vasya , masha , vovochka ];

people.sort(compareAge);


for(var i = 0; i < people.length; i++) {
    var peopleNameAge = people[i].name
    console.log(peopleNameAge);
}
