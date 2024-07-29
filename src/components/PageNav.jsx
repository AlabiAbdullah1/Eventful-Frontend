import { Link, NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";

export default function PageNav() {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <h1>EVENTFUL</h1>
      </Link>

      <ul>
        <li>
          <NavLink to="/creator-signup">Signup as Creator</NavLink>
        </li>
        <li>
          <NavLink to="/eventee-signup">Signup as Eventee</NavLink>
        </li>
        <li>
          <NavLink to="/creator-login" className={styles.ctaLink}>
            Creator Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/Eventee-login" className={styles.ctaLink}>
            Eventee Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
