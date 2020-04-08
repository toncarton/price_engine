# Price engine for toncarton

This repository will help you to setup and customize a personal price engine for your toncarton account.

## Introduction
The price engine is a simple `JavaScript function`.
It will receive as inputs all data provided by the customers
it will receive also a `base price` computed by toncarton.

The function should return an object containing:
1. `transportation`: the cost of the transportation ( tax included )
2. `handling`: The cost of the handling ( tax included )
3. `persons`: the number of handlers needed
4. `error`: (optional) an error message

```javascript
return {
  transportation: 10,
  handling: 10,
  persons: 1
}
```

When there is en error, you can return

```javascript
return {
  transportation: 0,
  handling: 0,
  error: "Your error message"
}
```

## A simple price engine code

```javascript

function priceEngine(TCT_ADDRESSES) {
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

module.exports = priceEngine;
```

## install

```bash
npm install
```

## Test
```bash
npm test
```
## Build your price engines
```bash
npm run build
```

The result will be in `dist/` folder.
The resulting files are starting with `tct_`

## Integration with your toncarton account
The last step is to copy the content of the file present in the `dist/` folder


## How the pice engine work
The function will be called with the arguments computed from the inputs of the customers
```
            TCT_TRANSPORTATION_FEE:      Base Price for a transportation cost in TTC (tax included)
            TCT_HANDLING_FEE:            Base Price fro the handling cost in TTC (tax included)
            TCT_PERSONS:                 Number of handlers needed to move all the items
            TCT_ADDRESSES:               Array of the addresses provided on the order form
            TCT_ITEMS:                   Array of items provided on the order form
            TCT_DISTANCE:                Total distance A/R for the transportation
            TCT_CAPACITY:                Total colume occupied by the items
            TCT_HANDLING_DURATION:       Handling time computed in (seconds)
            TCT_TRANSPORTATION_DURATION: Transportation time computed in (seconds)
```

## Use the cost computed by toncarton
Toncarton will compute the cost based on the addresses/elevator/floor and the items and expose this result on:
`TCT_TRANSPORTATION_FEE`, `TCT_HANDLING_FEE` and `TCT_PERSONS`
The price are in euro based on Paris, france.

Your price Engine can return this computed cost simply by returning them
```javascript
return {
  transportation: TCT_TRANSPORTATION_FEE, // prix TTC
  handling: TCT_HANDLING_FEE, // prix TTC
  persons: TCT_PERSONS
};
```

You can also customize this prices like this example, when the cost are `20%` greater than the base price of toncarton.

```javascript
return {
  transportation: TCT_TRANSPORTATION_FEE 1.2, // prix TTC
  handling: TCT_HANDLING_FEE * 1.2, // prix TTC
  persons: TCT_PERSONS
};
```

## Object interfaces

### Address (TCT_ADDRESSES)

When your customer choose addresses on the order form

```
TCT_ADDRESSES: Array of
{
    geocodeResolved: true
    lat: 48.8556174
    lng: 2.3600226
    locality: "Paris"
    country: "FR"
    postalCode: "75004"
    id: 0.6906698340755291
    placeId: null
    elevator: true  
    floor: 3  
    address: "12 Rue Rivoli, Paris, France"
    index: 0                                 // address order, 0: first
    label: ""
    notes: ""
}

```

### Item (TCT_ITMES)

Items are the object chosen by the customer like (box, table ..ect)

```
TCT_ITMES: array of:
{
    minimal_truck_capacity: 0           // The minimal size of the truck to load this item
    elevator: true                      // The presence of an elevator
    customPrice: undefined
    id: 8
    name: "Carton grand"
    category: "stuff"
    volume: 0.4                         // volume occupied in m3
    time_factor: 0.05                   // ratio form 1 hour to handle this object ( grether => more complicated to handle)
    persons_needed: 1                   // number of handlers needed to lift and move the item
    quantity: 1
}
```
