import { Card, Col, Row, message } from "antd";
import { useEffect, useState } from "react";
import { getMyBookings } from "../api/booking";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  // Group bookings by year
  const groupBookingsByYear = (bookings) => {
    return bookings.reduce((acc, booking) => {
      const year = new Date(booking.createdAt).getFullYear();

      if (!acc[year]) {
        acc[year] = [];
      }

      acc[year].push(booking);
      return acc;
    }, {});
  };

  const groupedBookings = groupBookingsByYear(bookings);

  // Fetch bookings
  const getData = async () => {
    try {
      const response = await getMyBookings();
      if (response.success) {
        setBookings(response.data);
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

      
      {bookings.length > 0 && (
        <div className="booking-container">

          
          {Object.keys(groupedBookings)
            .sort((a, b) => b - a)
            .map((year) => (
              <div key={year} className="booking-year-section">

               
                <h2 className="booking-year-heading">{year}</h2>

                <Row gutter={24}>
                  {groupedBookings[year].map((booking) => (
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
                            <h3 className="mt-0 mb-0">
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
                                {new Date(booking.show.date).toLocaleDateString(
                                  "en-IN"
                                )}{" "}
                                {booking.show.time}
                              </b>
                            </p>

                            <p>
                              Amount:{" "}
                              <b>
                                Rs.{" "}
                                {booking.seats.length *
                                  booking.show.ticketPrice}
                              </b>
                            </p>

                            <p className="booking-id">
                              Booking ID: <b>{booking.transactionId}</b>
                            </p>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
        </div>
      )}

      
      {bookings.length === 0 && (
        <div className="my-bookings-empty">
          <p className="my-bookings-text">
            You haven't booked any show yet!
          </p>

          <button className="my-bookings-btn" onClick={() => navigate("/")}>
            Start Booking
          </button>
        </div>
      )}
    </>
  );
};

export default Bookings;