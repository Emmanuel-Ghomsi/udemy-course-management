function PresentationCard() {
  return (
    <div className="col-12 mb-4">
      <div className="card">
        <div className="d-flex align-items-end row">
          <div className="col-sm-7">
            <div className="card-body">
              <h5 className="card-title text-primary">Hello! 🎉</h5>
              <p className="mb-4">Vous retrouverez ici la liste des cours.</p>
            </div>
          </div>
          <div className="col-sm-5 text-center text-sm-left">
            <div className="card-body pb-0 px-0 px-md-4">
              <img
                src="dist/img/illustrations/man-with-laptop-light.png"
                height="140"
                alt="View Badge User"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PresentationCard;
