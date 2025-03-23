import { Button } from "@/components"
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={css.hero}>
      <div className="container">
        <div className={css["cta-wrapper"]}>
          <div className={css["title-text"]}>
            <h1 className={css["display-text"]}>Campers of your dreams</h1>
            <h2 className={css.subtitle}>
              You can find everything you want in our catalog
            </h2>
          </div>
          <Button type="link" to="/catalog" className={css["cta-btn"]}>
            View Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;