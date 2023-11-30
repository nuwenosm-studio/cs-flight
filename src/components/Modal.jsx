import { useState } from 'react';
import { flightData } from '../constants/FlightData';

export const Modal = ({ fromCity, toCity, onClose }) => {

   const findFlight = (fromCity, toCity) => {
      const matchingFlights = flightData.filter((flight) => {
         return (
            flight.fromCity === fromCity &&
            flight.toCity === toCity
         );
      });
      return matchingFlights;
   };

   const [flights, setFlights] = useState(findFlight(fromCity, toCity));
   const [selectedFlight, setSelectedFlight] = useState(null);
   const [isSwapped, setIsSwapped] = useState(false);

   const handleSwapCities = () => {
      const newFromCity = isSwapped ? fromCity : toCity;
      const newToCity = isSwapped ? toCity : fromCity;
      setIsSwapped(!isSwapped);
      setFlights(findFlight(newFromCity, newToCity));
   };

   const handleBuyNow = () => {
      if (selectedFlight) {
         // Decrease the number of available seats
         const updatedFlights = flights.map((flight) => {
            if (flight.id === selectedFlight.id && flight.seatAvailability > 0) {
               return {
                  ...flight,
                  seatAvailability: flight.seatAvailability - 1,
               };
            }
            return flight;
         });
         setFlights(updatedFlights);
      }
   };

   
   return (
      <div className="modal">
         <div className="modal_bigText">Available Flights</div>
         <button onClick={handleSwapCities}>Swap Cities</button>

         <ul className="flight_tickets">
            {flights.map((flight) => (
               <li 
                  key={flight.id} 
                  onClick={() => setSelectedFlight(flight)}
               >
                  <div>
                     <strong>From:</strong> {flight.fromCity}
                     <span className="space_css"></span>
                     <strong>To:</strong> {flight.toCity}
                  </div>
                  <div>
                     <strong>Flight Number: </strong> 
                     {flight.flightNumber} 
                  </div>
                  <div>
                     <strong>Time: </strong>
                     {flight.departureTime} - {flight.arrivalTime}
                  </div>
                  <div>
                     <strong>Seats Available: </strong> 
                     {flight.seatAvailability}
                  </div>
                  <div>
                     <strong>Price: </strong>
                     ${flight.price}
                  </div>
               </li>
            ))}
         </ul>

         <button onClick={handleBuyNow} disabled={!selectedFlight}>
            Buy Now
         </button>

         <button onClick={onClose}>Close</button>
      </div>
   )
}
