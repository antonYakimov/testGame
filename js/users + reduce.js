/** * Created by bonya on 18.11.16. */

var users = [{
  name: 'Anton',
  surname: 'Yakimov',
  age: 24,
  gender:'m',
  },

  {
    name: 'Nikita',
    surname: 'Kornilov',
    age: 25,
    gender:'m'
  },

  {
    name: 'Denis',
    surname: 'Domrachev',
    age: 23,
    gender:'m'
  },

  {
    name: 'Tanya',
    surname: 'Goncharova',
    age: 24,
    gender:'f'
  },

  {
    name: 'Anton',
    surname: 'Lukashin',
    age: 28,
    gender:'m'
  },

  {
    name: 'Aleksey',
    surname: 'Yakimenko',
    age: 27,
    gender:'m'
  },

  {
    name: 'Anton',
    surname: 'Martynov',
    age: 27,
    gender:'m'
  },

  {
    name: 'Dmitro',
    surname: 'Miroshnychenko',
    age: 26,
    gender:'m'
  },

  {
    name: 'Anastasia',
    surname: 'Vakhrusheva',
    age: 23,
    gender:'f'
  },

  {
    name: 'Elena',
    surname: 'Yakimova',
    age: 52,
    gender: 'f'
  }
];





var averageAge = function (list) {
  var result = 0;
  for (var i = 0; i < list.length; i ++) {
    result = result + list[i].age;
  }
  return result/list.length;
};

var getNames = function (list) {
  var names = [];
  for (var i = 0; i < list.length; i++) {
    names.push(list[i].name);
  }
  return names;
};

var names = getNames(users);

var mapNames = function (list) {
    var quantityNames = {};
  for (var i = 0; i < list.length; i++) {
   quantityNames[list[i]] = quantityNames[list[i]] ? quantityNames[list[i]] + 1 : 1;
  }
  return quantityNames;
};

var mappedNames = mapNames(names);

