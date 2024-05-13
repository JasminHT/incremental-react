
export var initialResources = {};
export var initialBuilding = {};


function addResource(type, value=0) {
  initialResources[type] = value;
}

function addLoadingBar(type) {
  initialBuilding[type] = false;
}


addResource('food', 0);
addResource('wood', 0);
addResource('stone', 0);
addResource('farm', 0);
addResource('house', 0);
addResource('wall', 0);

addLoadingBar('farm');
addLoadingBar('house');
addLoadingBar('wall');


