import { getShowById } from "../api/shows.js";
import { useNavigate, useParams } from "react-router-dom"; // Hooks for routing
import { useEffect, useState } from "react";
import { message, Card, Button } from "antd"; // UI components
import StripeCheckout from "react-stripe-checkout";
import { bookShow, makePayment } from "../api/booking";

export default function BookShow() {
  const { showId } = useParams();
  const [show, setShow] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const [totalSeats, setTotalSeats] = useState(1);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      // Call API with showId
      const response = await getShowById(showId);

      // If API call is successful
      if (response.success) {
        setShow(response.data); // Store show data in state
        setRows(response.data.theatre.rows);
        setColumns(response.data.theatre.columns);
        setTotalSeats(
          response.data.theatre.rows * response.data.theatre.columns,
        );

        // Optional success message
        // message.success(response.message);

        console.log(response.data); // Debug log
      } else {
        // If API returns error
        message.error(response.message);
      }
    } catch (err) {
      // If API fails (network/server error)
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getSeats = () => {
    return (
      <div className="d-flex flex-column align-items-center">
        <div className="w-100 max-width-600 mx-auto mb-25px">
          <p className="text-center">Screen this side</p>
        </div>

        {/* eventual array becomes 0, 1, 2, 3, 4 
            Array(5).keys = (0,1,2,3,4)

            [(0,1,2,3,4)]

          -> */}

        {/* 
          
            Grid of seats

            Row 0 - 1,2, 3 
            Row 1 - 4,5,6
            Row....
          
            rows->loop 
              columns -> loop


            row = 1
            column = 2
            columns = 12

            1*12 + 2 + 1 = 15

          */}
        <div className="seat-container">
          <div className="seat-layout">
            {Array.from(Array(rows).keys()).map((row) => {
              return (
                <div key={row} className="seatrow">
                  {Array.from(Array(columns).keys()).map((column) => {
                    let seatNumber = row * columns + column + 1; // 0*4+0+1=1 , 0*4+1+1=2, 1*4+0+1=5
                    let seatClass = "seat-btn";

                    if (selectedSeats.includes(seatNumber)) {
                      seatClass += " selected";
                    }

                    if (show?.bookedSeats?.includes(seatNumber)) {
                      seatClass += " booked";
                    }

                    if (seatNumber <= totalSeats) {
                      return (
                        <button
                          key={seatNumber}
                          onClick={() => {
                            if (selectedSeats.includes(seatNumber)) {
                              setSelectedSeats(
                                selectedSeats.filter(
                                  (curSeatNumber) =>
                                    curSeatNumber !== seatNumber,
                                ),
                              );
                            } else {
                              setSelectedSeats([...selectedSeats, seatNumber]);
                            }
                          }}
                          className={seatClass}
                        >
                          {seatNumber}
                        </button>
                      );
                    }

                    return null;
                  })}
                </div>
              );
            })}
          </div>
        </div>

        <div className="d-flex bottom-card justify-content-between w-100 max-width-600 mx-auto mb-25px mt-3">
          {/* Selected seats display */}
          <div className="flex-1">
            Selected Seats: <span>{selectedSeats.join(", ")}</span>
          </div>

          {/* Total price calculation */}
          <div className="flex-shrink-0 ms-3">
            Total Price:{" "}
            <span>Rs. {selectedSeats.length * show.ticketPrice}</span>
          </div>
        </div>
      </div>
    );
  };

  const onToken = async (token) => {
    try {
      const response = await makePayment(
        token,
        selectedSeats.length * show.ticketPrice * 100,
      );
      if (response.success) {
        book(response.data);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const book = async (transactionId) => {
    const response = await bookShow({
      seats: selectedSeats,
      transactionId,
      show: showId,
      user: localStorage.getItem("userId"),
    });
    if (response.success) {
      navigate("/");
    }
  };

  const formatTime = (time) => {
    if (!time) return "";

    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;

    return `${hour}:${minute} ${ampm}`;
  };

  return (
    <>
      {show && (
        <Card
          title={
            <div>
              <h1 className="movie-title">{show?.movie?.title}</h1>
              <p>
                Theatre: {show.theatre.name}, {show.theatre.address}
              </p>
            </div>
          }
          extra={
            <div className="show-name py-3">
              {/* Show name */}
              <h3>
                <div>Shows Date: {show.date}</div>{" "}
                <div>Shows Time: {formatTime(show.time)}</div>
              </h3>
              <h3>Ticket Price: ₹ {show.ticketPrice}</h3>
            </div>
          }
        >
          {getSeats()}

          {selectedSeats.length > 0 && (
            <StripeCheckout.default
              token={onToken}
              billingAddress
              amount={selectedSeats.length * show.ticketPrice}
              stripeKey="xxxxxx"
            >
              <div className="max-width-600 mx-auto">
                <Button type="primary" shape="round" size="large" block>
                  Pay Now
                </Button>
              </div>
            </StripeCheckout.default>
          )}
        </Card>
      )}
    </>
  );
}
