import { Button, Card, Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import { getAllBookings, getMyBookings } from "../api/booking";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const getData = async () => {
    try {
      const response = await getMyBookings();
      if (response.success) {
        setBookings(response.data);
        console.log(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1 className="my-movie-list">My Bookings</h1>
      {bookings && (
        <div className="booking-container">
          <Row gutter={24}>
            {bookings.map((booking) => {
              return (
                <Col
                  key={booking._id}
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  lg={{ span: 8 }}
                >
                  <Card className="mb-3">
                    <div className="d-flex flex-column-mob booking-card">
                      <div className="flex-shrink-0">
                        <img
                          src={booking.show.movie.posterUrl}
                          width={100}
                          alt="Movie Poster"
                          className="booking-poster"
                        />
                      </div>
                      <div className="show-details flex-1 booking-details">
                        <h3 className="mt-0 mb-0 ">
                          {booking.show.movie.title}
                        </h3>
                        <p>
                          Theatre: <b>{booking.show.theatre.name}</b>
                        </p>
                        <p>
                          Seats: <b>{booking.seats.join(", ")}</b>
                        </p>
                        <p>
                          Date & Time:{" "}
                          <b>
                            {new Date(booking.show.date).toLocaleDateString("en-IN")}{" "} {booking.show.time}
                          </b>{" "}
                        </p>
                        <p>
                          Amount:{" "}
                          <b>
                            Rs.
                            {booking.seats.length *
                              booking.show.ticketPrice}{" "}
                          </b>
                        </p>
                        <p className="booking-id">
                          Booking ID: <b>{booking.transactionId} </b>
                        </p>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      )}

      {!bookings.length && (
        <div className="my-bookings-empty">
          <p className="my-bookings-text">You haven't booked any show yet!</p>

          <button className="my-bookings-btn" onClick={() => navigate("/")}>
            Start Booking
          </button>
        </div>
      )}
    </>
  );
};
export default Bookings;
