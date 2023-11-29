import { useState } from 'react';
import { FlightModal } from './FlightModal';
import { cities } from '../constants/FlightData';

export const FlightBoard = () => {
   const [selectedFrom, setSelectedFrom] = useState('');
   const [selectedTo, setSelectedTo] = useState('');
   const [isModalOpen, setIsModalOpen] = useState(false);

   const handleCheckTicket = () => {
      setIsModalOpen(true);
   };
   
   return (
      <div className="container_board">
         <table>
            <thead>
               <tr>
                  {/* Column Header */}
                  <th>From</th>
                  <th>To</th>
                  <th>Tickets</th>
               </tr>
            </thead>

            <tbody>
               {cities.map((fromCity) => (
                  <tr key={fromCity}>
                     {/* Row [From - To - button]  */}
                     <td>{fromCity}</td>
                     <td>
                        <select
                           value={selectedTo}
                           onChange={(e) => setSelectedTo(e.target.value)}
                        >
                           {cities
                              .filter((toCity) => toCity !== fromCity)
                              .map((toCity) => (
                                 <option key={toCity} value={toCity}>
                                    {toCity}
                                 </option>
                           ))}
                        </select>
                     </td>
                     <td>
                        <button
                           className="btn_long"
                           onClick={handleCheckTicket}>
                           View Tickets
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         {isModalOpen && (
            <FlightModal
               from={selectedFrom}
               to={selectedTo}
               onClose={() => setIsModalOpen(false)}
            />
         )}
      </div>
   )
}
