import React from "react";
import { Link } from "react-router-dom";
import imageMap from "../images/image";
import freshNestGrocery from "../images/Freshnest-Grocery.png";
import "../styles/GuestHome.css";

function GuestHome() {
  const groceryCategories = [
    {
      title: "Fresh Vegetables",
      description: "Fresh vegetables for healthy, everyday meals.",
      image: imageMap.Vegetables,
      alt: "Fresh vegetables assortment",
      linkText: "Shop Vegetables",
    },
    {
      title: "Fresh Fruits",
      description: "Enjoy delicious fruits full of natural goodness.",
      image: imageMap.Fruits,
      alt: "Fresh fruit assortment",
      linkText: "Shop Fruits",
    },
    {
      title: "Dry Fruits",
      description: "Discover nutritious nuts and dried fruits.",
      image: imageMap["Dried Fruits"],
      alt: "Assorted dry fruits and nuts",
      linkText: "Shop Dry Fruits",
    },
    {
      title: "Pulses and Grains",
      description: "Stock up on dals, beans, rice and grains.",
      image: imageMap["Pulses and Grains"],
      alt: "Assorted pulses and grains",
      linkText: "Shop Pulses and Grains",
    },
    {
      title: "Spices",
      description: "Add rich aroma and flavour to your cooking.",
      image: imageMap.Spices,
      alt: "Assorted Indian spices",
      linkText: "Shop Spices",
    },
    {
      title: "Daily Essentials",
      description: "Find tea, coffee, jaggery and kitchen essentials.",
      image: imageMap["Daily Essentials"],
      alt: "Everyday grocery essentials",
      linkText: "Shop Essentials",
    },
  ];

  return (
    <main className="guest-home">
      {/* Hero Section */}
      <section className="guest-hero">
        <div className="guest-hero-content">
          <span className="guest-badge">
            <span className="guest-badge-dot" />
            FRESHNESS AT YOUR DOORSTEP
          </span>

          <h1>
            Fresh Groceries.
            <br />
            <span>Happy Homes.</span>
          </h1>

          <p className="guest-hero-description">
            Shop fresh fruits, vegetables, pulses, grains, dry fruits,
            spices and everyday grocery essentials—all delivered
            conveniently to your door.
          </p>

          <div className="guest-hero-actions">
            <Link to="/products" className="guest-primary-button">
              Shop Groceries <span aria-hidden="true">→</span>
            </Link>

            <Link to="/login" className="guest-secondary-button">
              Sign In
            </Link>
          </div>

          <div className="guest-hero-points">
            <span>✓ Everyday essentials</span>
            <span>✓ Easy ordering</span>
            <span>✓ Convenient delivery</span>
          </div>
        </div>

        {/* Hero Grocery Image */}
        <div className="guest-hero-visual">
          <div className="guest-hero-circle" />

          <div className="guest-hero-image-frame">
            <img
              className="guest-produce-image"
              src={freshNestGrocery}
              alt="FreshNest grocery collection"
            />
          </div>
        </div>
      </section>

      {/* Six Grocery Categories */}
      <section className="guest-benefits">
        <div className="guest-section-heading">
          <span className="guest-section-eyebrow">
            GOOD FOOD STARTS HERE
          </span>

          <h2>
            Fresh choices for <span>every meal</span>
          </h2>

          <p>
            Explore our six grocery categories for all your everyday needs.
          </p>
        </div>

        <div className="guest-benefit-grid">
          {groceryCategories.map((category) => (
            <article
              className="guest-benefit-card"
              key={category.title}
            >
              <Link
                to="/products"
                className="guest-benefit-image"
                aria-label={category.linkText}
              >
                <img
                  src={category.image}
                  alt={category.alt}
                  loading="lazy"
                />
              </Link>

              <h3>{category.title}</h3>

              <p>{category.description}</p>

              <Link to="/products" className="guest-category-link">
                {category.linkText}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="guest-how-it-works">
        <div className="guest-how-content">
          <span className="guest-section-eyebrow">
            SIMPLE AND CONVENIENT
          </span>

          <h2>Your groceries in three easy steps</h2>

          <div className="guest-steps">
            <div className="guest-step">
              <span className="guest-step-number">01</span>
              <div>
                <h3>Create your account</h3>
                <p>Register to get started with your orders.</p>
              </div>
            </div>

            <div className="guest-step">
              <span className="guest-step-number">02</span>
              <div>
                <h3>Choose your groceries</h3>
                <p>
                  Explore fruits, vegetables, pulses, grains,
                  dry fruits and spices.
                </p>
              </div>
            </div>

            <div className="guest-step">
              <span className="guest-step-number">03</span>
              <div>
                <h3>Place your order</h3>
                <p>
                  Complete checkout and view your order status.
                </p>
              </div>
            </div>
          </div>

          <Link to="/products" className="guest-primary-button">
            Explore Groceries <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="guest-how-visual">
          <div className="guest-how-circle">
            <span className="guest-how-grocery" aria-hidden="true">
              🛒
            </span>

            <span className="guest-how-heart" aria-hidden="true">
              ♥
            </span>
          </div>

          <div className="guest-how-caption">
            <strong>Fresh choices. Easy ordering.</strong>
            <span>Your kitchen, made simpler.</span>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="guest-final-cta">
        <div className="guest-cta-content">
          <span className="guest-cta-eyebrow">
            READY WHEN YOU ARE
          </span>

          <h2>Your next delicious meal starts here.</h2>

          <p>
            Explore our grocery collection and get started today.
          </p>
        </div>

        <Link to="/register" className="guest-cta-button">
          Join Us Today <span aria-hidden="true">→</span>
        </Link>
      </section>

      {/* Footer */}
      <footer className="guest-footer">
        <p className="guest-footer-copy">
          Project Developed By <strong>Aman Attar</strong>
        </p>
      </footer>
    </main>
  );
}

export default GuestHome;