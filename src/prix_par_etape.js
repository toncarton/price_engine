function grille(TCT_ADDRESSES) {
  const PRICE_ETAPE = 20;

  if(TCT_ADDRESSES.length === 0) {
    return {
      transportation: 0, handling: 0
    };
  }

  const NOMBRE_ETAPE = TCT_ADDRESSES.length - 1;

  return {
    transportation: PRICE_ETAPE * NOMBRE_ETAPE * 1.2,
    handling: 0, persons: 1
  };
}


module.exports = grille;
