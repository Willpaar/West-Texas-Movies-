import React from 'react'
import './ThankYouBody.css';
import { useLocation } from 'react-router-dom';

export default function ThankYouBody() {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);

    const title = queryParams.get('title');
    const date = queryParams.get('date');
    const time = queryParams.get('time');
    const location = queryParams.get('location');
    const tickets = queryParams.get('tickets');
    const img = queryParams.get('img');

    const printTickets = () => {
        alert('Tickets Printed!')
    }
    
    return (
        <div>
            <h1>Thank you for your purchase!</h1>
            <div className="coverCont">
                <img src={img} alt="" />
            </div>
            <div className="thankYouCont">
                <h1>Thank You For Your Purchase!</h1>
                <p>You bought {tickets} ticket{tickets !== "1" && "s"} to see {title} on {date} at {time} in {location}.</p>
                <p>You can view you order history in user settings</p>
                <img src="barcodes/barcode8.png" alt="" />
                <button onClick={printTickets}>Print Tickets</button>
            </div>
        </div>
    );
}

