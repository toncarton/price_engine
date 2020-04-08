# Price engine for toncarton

This repository will help you to setup and customize a personal price engine for your toncarton account.

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

The result will be in `dist` folder.
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

## Object interface

### Address (TCT_ADDRESSES)
When your customer chose addresses on the order form
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
