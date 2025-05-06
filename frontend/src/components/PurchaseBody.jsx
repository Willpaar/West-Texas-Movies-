import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './PurchaseBody.css';

export default function PurchaseBody({ movie }) {
    const hashParams = new URLSearchParams(window.location.hash.substring(1)); // strip the '#' and parse
    const movieTime = hashParams.get('time');
    const [ticketCount, setTicketCount] = useState(1);
    const userID = sessionStorage.getItem('userID');
    const [cardNumber, setCardNumber] = useState('');
    const [cardMonth, setCardMonth] = useState('');
    const [cardYear, setCardYear] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const navigate = useNavigate();

    const changeQuantity = (delta) => {
        setTicketCount((prev) => Math.min(10, Math.max(1, prev + delta)));
    };

    const handlePurchase = async () => {
        if (
            cardNumber.length !== 16 ||
            cardCVV.length !== 3 ||
            !cardMonth ||
            !cardYear
        ) {
            alert('Please enter a valid 16-digit card number, 3-digit CVV, and select month/year.');
            return;
        }

        const purchaseData = {
            userID: userID,
            title: movie.title,
            date: movie.date,
            time: movieTime,
            location: movie.location,
            numberOfTickets: ticketCount
        };
    
        try {
            const response = await fetch('http://localhost:8000/Add-Purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(purchaseData)
            });
    
            const result = await response.json();
            if (result.success) {
                const queryParams = new URLSearchParams({
                    img: movie.img,
                    title: movie.title,
                    date: movie.date,
                    time: movieTime,
                    location: movie.location,
                    tickets: ticketCount
                });
            
                navigate(`/ThankYouForYourPurchase?title=${encodeURIComponent(movie.title)}&img=${movie.img}&date=${movie.date}&time=${movieTime}&location=${movie.location}&tickets=${ticketCount}`);
           } else {
                alert('Purchase failed.');
            }
        } catch (error) {
            console.error('Error sending purchase:', error);
            alert('An error occurred.');
        }
    };

    return (
        <div className="PurchaseBody">
            <h1>Purchase Tickets to see {movie.title} on {movie.date} {movieTime} in {movie.location}</h1>
            <div className="purchaceCont">
                <div className="coverCont">
                    <img src={movie.img} alt="" />
                </div>
                <div className="detailsCont">
                    <p>Number of tickets</p>
                    <div className="ticketSelector">
                        <button onClick={() => changeQuantity(-1)}>-</button>
                        <input type="number" value={ticketCount} readOnly />
                        <button onClick={() => changeQuantity(1)}>+</button>
                    </div>
                    <input
                        type="number"
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                    <div className="cardDateAndCVV">
                        <select value={cardMonth} onChange={(e) => setCardMonth(e.target.value)}>
                            <option value="">Month</option>
                            {[...Array(12)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {String(i + 1).padStart(2, '0')}
                                </option>
                            ))}
                        </select>

                        <select value={cardYear} onChange={(e) => setCardYear(e.target.value)}>
                            <option value="">Year</option>
                            {Array.from({ length: 15 }, (_, i) => {
                                const year = new Date().getFullYear() + i;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>

                        <input
                            type="number"
                            placeholder="CVV"
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value)}
                        />
                    </div>
                    <button onClick={handlePurchase}>Buy Tickets</button>
                    </div>
                <div className="cartCont">
                    <h1>Cart and Total</h1>

                    {/* List each ticket individually */}
                    {[...Array(ticketCount)].map((_, index) => (
                        <p key={index}>Ticket for {movie.title} = $10.00</p>
                    ))}

                    <hr />
                    <p>Subtotal: ${(ticketCount * 10).toFixed(2)}</p>
                    <p>Sales Tax (6.5%): ${(ticketCount * 10 * 0.065).toFixed(2)}</p>
                    <h3>Total: ${(ticketCount * 10 * 1.065).toFixed(2)}</h3>
                </div>
            </div>
        </div>
    );
}
