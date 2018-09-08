import React from 'react';

export default function StoreItem(props) {
  return (
    <div className="store-item">
      <div>{props.store.name}</div>
        {
          props.store.timeslots.map((timeslot, i) => 
          <div key={i} className="store-timeslots">
            <span>{timeslot.days}</span>
            <span>{timeslot.time}</span>
          </div>
          )
        }
    </div>
  )
}