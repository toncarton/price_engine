var assert = require('assert');
var price_engine_validator = require('../test_helpers/validation');

var grille = require('../src/code_postal');

describe('grille tarifaire', function() {
  describe('validation test', function() {
    it('should be valide', function() {
      assert.doesNotThrow(price_engine_validator(grille));
    });
  });

  describe('outside of paris', function() {
    it('hors paris', function() {
      const addresses = [
        {postalCode: '75001'},
        {postalCode: '94100'},
      ];
      const durationS = 15 * 60;

      assert.equal(grille(addresses, durationS).transportation / 1.2, 0);
      assert(grille(addresses, durationS).error.includes('hors zone'));
    });

    it('postalcode not exists', function() {
      const addresses = [
        {address: 'montrouge'},
        {postalCode: '94100'},
      ];
      const durationS = 15 * 60;

      assert.equal(grille(addresses, durationS).transportation / 1.2, 0);
    });
  });

  describe('zone 1', function() {
    it('prix zone 1', function() {
      const addresses = [
        {postalCode: '75001'},
        {postalCode: '75003'},
      ];

      assert.equal(grille(addresses).transportation, 30 * 1.2);
    });

  });

  describe('zone 2', function() {
    it('prix zone 2', function() {
      const addresses = [
        {postalCode: '75001'},
        {postalCode: '75010'},
      ];
      const durationS = 15 * 60;

      assert.equal([1, 2, 3].indexOf(4), -1);

      assert.equal(grille(addresses, durationS).transportation, 50 * 1.2);
    });
  });
});
