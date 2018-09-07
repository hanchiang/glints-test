## Approach to importing data and storing dates
* For each store, represent the open timings as an array of timeslot arrays
    * Timeslot is an object with the form: { days: (array of days), time: (24 hour time) }
    * Where day is represented by number(0 = monday, 6 = sunday)

### Examples
1. Osakaya Restaurant  
Mon-Thu, Sun 11:30 am - 9 pm  / Fri-Sat 11:30 am - 9:30 pm
```
{
  name: 'Osakaya Restaurant',
  timeslots: [
    {
      days: [0, 1, 2, 3, 6],
      time: [1130, 2100]
    },
    {
      days: [4, 5],
      time: [1130, 2130]
    }
  ]
}
```

2. A-1 Cafe Restaurant  
Mon, Wed-Sun 11 am - 10 pm
```
{
  name: 'A-1 Cafe Restaurant',
  timeslots: [
    {
      days: [0, 2, 6],
      time: [1100, 2200]
    }
  ]
}
```