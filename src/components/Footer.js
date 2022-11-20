function Footer() {
  return (
    <footer className="content-footer footer bg-footer-theme">
      <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
        <div className="mb-2 mb-md-0">
          &copy; {new Date().getFullYear()}, by &nbsp;
          <a
            href="https://hkdigitals.com"
            target="_blank"
            className="footer-link fw-bolder"
          >
            Hkdigitals
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
