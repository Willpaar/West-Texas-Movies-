import React from 'react'
import './ThankYouBody.css';
import { useLocation } from 'react-router-dom';

export default function ThankYouBody() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const title    = queryParams.get('title');
  const date     = queryParams.get('date');
  const time     = queryParams.get('time');
  const location = queryParams.get('location');
  const tickets  = queryParams.get('tickets');
  const img      = queryParams.get('img');

  const printTickets = () => alert('Tickets Printed!')

  return (
    <div className="thankYouPage">
      <div className="coverCont1">
        <img className="coverImage" src={img} alt="" />
      </div>
      <div className="thankYouCont">
        <p>
          You bought {tickets} ticket{tickets !== "1" && "s"} to see {title} on {date} at {time} in {location}.
        </p>
        <p>You can view your order history in user settings</p>
        <button onClick={printTickets}>Print Tickets</button>
      </div>
    </div>
  );
}
