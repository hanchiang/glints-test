## State management

### Store reducer
```
{
  stores: [list of stores]
}

store: {
  name: 'Best in town',
  timeslots: [list of timeslots]
}

timeslot: {
  days: [0, 1, 2],
  time: [920, 2302]
}
```

### Filter Reducer
```
{
  date: moment()
}
```

### User reducer
```
{
  name: 'han',
  collections: [list of collections]
}

collection: {
  name: 'Best BBQ',
  stores: [list of stores]
}
```