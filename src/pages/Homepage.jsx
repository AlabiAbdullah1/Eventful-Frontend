import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          WELCOME TO EVENTFUL
          <br />
          Your gateway to Exciting Events
        </h1>
        <h2>
          Are you tired of missing out on the hottest events in town? Look no
          further! Eventful is your one-stop destination for discovering and
          purchasing tickets to the most thrilling events around. Whether you’re
          into concerts, sports, theater, or festivals, we’ve got you covered
          with a seamless and user-friendly platform designed to cater to all
          your event needs.
        </h2>

        <Link to="/login" className="cta">
          Buy Your Tickets now!
        </Link>
      </section>
    </main>
  );
}
