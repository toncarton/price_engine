var assert = require('assert');
var price_engine_validator = require('../test_helpers/validation');

var grille = require('../src/prix_par_etape');

describe('grille tarifaire par etape', function() {
  describe('validation test', function() {
    it('should be valide', function() {
      assert.doesNotThrow(price_engine_validator(grille));
    });
  });

  it('prix pour un point de collecte et un point de livraison', function() {

    const addresses = [{codePostal: '75001'}, {codePostal: '75002'}];

    assert.equal(grille(addresses).transportation, 20 * 1.2);
  });

  it('prix pour deux points de livraison', function() {

    const addresses = [{codePostal: '75001'},
                       {codePostal: '75002'},
                       {codePostal: '75002'}];

    assert.equal(grille(addresses).transportation, 20 * 2 * 1.2);
  });
});
