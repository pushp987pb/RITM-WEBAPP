
function Footer(){
    return(
        <>
  {/* Remove the container if you want to extend the Footer to full width. */}
  <div className="">
    {/* Footer */}
    <footer
      className="text-center text-lg-start text-dark"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      {/* Section: Social media */}
     
      <section className="pt-2">
        <div className="container text-center text-md-start ">
          {/* Grid row */}
          <div className="row mt-2">
            {/* Grid column */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto">
              {/* Content */}
              <h6 className="text-uppercase fw-bold">TEMPLE DEVELOPMENT</h6>
              
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto">
              {/* Links */}
              <h6 className="text-uppercase fw-bold">SERVICES</h6>
              
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto">
              {/* Links */}
              <h6 className="text-uppercase fw-bold">Useful links</h6>
              {/* <hr
                className="mt-0 d-inline-block mx-auto"
                style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
              /> */}
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0">
              {/* Links */}
              <h6 className="text-uppercase fw-bold">Contact</h6>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
      </section>
      {/* Section: Links  */}
      {/* Copyright */}
      <div
        className="text-center p-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2024 Copyright:
        <a className="text-dark" href="localhost:3000">
          templemanagement.com
        </a>
      </div>
      {/* Copyright */}
    </footer>
    {/* Footer */}
  </div>
  {/* End of .container */}
</>

     )
}

export default Footer