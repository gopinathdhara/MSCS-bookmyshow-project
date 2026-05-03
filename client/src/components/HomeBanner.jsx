export default function HomeBanner() {
  return (
    <div
      style={{
        margin: "20px",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        height: "360px",
        backgroundImage:
          "url('/banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
  style={{
    backgroundImage: "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/banner.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "360px",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    color: "white",
    textAlign: "center",
  }}
>
        {/* <h1 className="footer_cls" style={{ fontSize: "38px", marginBottom: "10px",textTransform:"uppercase" }}>
          Welcome to  CineVerse
        </h1>
        <p className="footer_cls" style={{ fontSize: "18px", maxWidth: "500px", marginBottom: "18px",textAlign:"center",margin:"0 auto" }}>
          Book movie tickets easily and explore the latest shows near you.
        </p> */}
        
      </div>
    </div>
  );
}