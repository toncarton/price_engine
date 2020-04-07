
  const PRICE_ZONE_1 = 30;
  const PRICE_ZONE_2 = 50;

  if (!TCT_ADDRESSES.every(a => a.postalCode)) {
    return {
      transportation: 0,
      handling: 0,
      error: "Merci de renseigner des adresses complètes comme 12 rue .."
    };
  }

  ;

  if (TCT_ADDRESSES.length === 0) {
    return {
      transportation: 0,
      handling: 0
    };
  }

  ;
  const postalCodes = [TCT_ADDRESSES[0].postalCode || '', TCT_ADDRESSES[TCT_ADDRESSES.length - 1].postalCode || ''];
  const inParis = postalCodes.every(code => code.substr(0, 2) === '75');
  const nbSteps = TCT_ADDRESSES.length - 2;
  const totalDurationMinutes = TCT_TRANSPORTATION_DURATION / 60 + 7 * nbSteps;

  if (inParis === false) {
    return {
      transportation: 0,
      handling: 0,
      error: "Désolé, vous etes hors zone de livraison !"
    };
  }

  ;
  const zone1 = ['75001', '75002', '75003', '75004', '75005', '75006'];
  const zone2 = ['75007', '75008', '75009', '75010', '75011', '75012'].concat(zone1);
  const addressesInZone1 = postalCodes.every(cp => zone1.includes(cp));
  const addressesInZone2 = postalCodes.every(cp => zone2.includes(cp));

  if (addressesInZone1) {
    price = PRICE_ZONE_1;
  } else {
    price = PRICE_ZONE_2;
  }

  return {
    transportation: price * 1.2,
    handling: 0,
    persons: 1
  };
