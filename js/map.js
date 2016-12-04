/**
 * Created by bonya on 17.11.16.
 */
var list = [1, 2, 3, 4];
var addPlus2 = function (a){
 return a+2
};
var map = function (list, func){
var newList = [];
for (var i=0; i<list.length; i++){
  var hh = func(list[i]);
  newList.push(hh);
};
  return newList;
};

var newArray = map(list,addPlus2)