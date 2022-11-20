import { Link } from "react-router-dom";

function Aside() {
  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div className="app-brand demo">
        <Link to="/" className="app-brand-link">
          <span className="app-brand-text demo menu-text fw-bolder ms-2">
            🎉
          </span>
        </Link>

        <a
          href="#"
          className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
        >
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        <li className="menu-item active">
          <Link to="/" className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div>Tous les cours</div>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Aside;
