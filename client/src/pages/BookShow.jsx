import { useParams } from "react-router-dom";

export default function BookShow() {
  const { showId } = useParams();

  return (
    <div>
      <h2>Book Show</h2>
      <p>Show ID: {showId}</p>
      <p>Seat selection will be implemented in the next class.</p>
    </div>
  );
}
