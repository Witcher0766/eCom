import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles["not-found"]}>
      <div>
        <h2>404</h2>
        <p>Opppppsss, page not found.</p>
        <button className="btn-success">
          <Link to="/">&larr; Back To Home</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;