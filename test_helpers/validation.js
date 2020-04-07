
function validate(grille) {
  const grilleFunctionString = grille.toString();
  const grilleFunctionBody = grilleFunctionString
        .slice(grilleFunctionString.indexOf("{") + 1, grilleFunctionString.lastIndexOf("}"));

  return function(){
      priceFunction = new Function(
        'TCT_TRANSPORTATION_FEE',
        'TCT_HANDLING_FEE',
        'TCT_PERSONS',
        'TCT_ADDRESSES',
        'TCT_ITEMS',
        'TCT_DISTANCE',
        'TCT_CAPACITY',
        'TCT_HANDLING_DURATION',
        'TCT_TRANSPORTATION_DURATION',
        grilleFunctionBody);

      const res_ = priceFunction(0,0,0,[],[],0,0,0,0);
      if(isNaN(res_.transportation / 1.2) || isNaN(res_.handling) ) { throw 'required fields not found'; }
    };
}

module.exports = validate;
