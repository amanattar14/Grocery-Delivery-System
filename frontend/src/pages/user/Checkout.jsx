import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../styles/Checkout.css";

const DEFAULT_QR_IMAGE = "/upi_qr.png";

function formatPrice(value) {
  return Number(value || 0).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
}

function getErrorMessage(error) {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went wrong. Please try again."
  );
}

function getCartItems(data) {
  const candidates = [
    data?.cart?.items,
    data?.data?.cart?.items,
    data?.items,
    data?.cartItems,
    data?.data?.items,
    data?.data?.cartItems,
  ];

  return candidates.find(Array.isArray) || [];
}

function getProduct(item) {
  return item?.product || item?.productDetails || item || {};
}

function getProductName(item) {
  const product = getProduct(item);
  return (
    item?.productName ||
    product?.name ||
    product?.productName ||
    "Fresh product"
  );
}

function getProductPrice(item) {
  const product = getProduct(item);
  return Number(
    item?.unitPrice ??
      item?.price ??
      product?.price ??
      product?.unitPrice ??
      product?.sellingPrice ??
      0
  );
}

function getQuantity(item) {
  return Number(item?.quantity ?? item?.qty ?? 1);
}

function getQuantityUnit(item) {
  const product = getProduct(item);
  const name = getProductName(item).toLowerCase();

  if (name.includes("egg")) return "pcs";

  const rawUnit =
    item?.unit ??
    item?.quantityUnit ??
    item?.unitOfMeasure ??
    item?.measurementUnit ??
    product?.unit ??
    product?.quantityUnit ??
    product?.unitOfMeasure ??
    product?.measurementUnit ??
    "";

  const unit = String(rawUnit).trim().toLowerCase();

  if (["g", "gm", "gms", "gram", "grams"].includes(unit)) {
    return "gm";
  }

  return "kg";
}

function formatDisplayQuantity(item) {
  const quantity = getQuantity(item);
  const unit = getQuantityUnit(item);

  if (!Number.isFinite(quantity) || quantity < 0) {
    return `0 ${unit}`;
  }

  if (unit === "kg" && quantity > 0 && quantity < 1) {
    return `${Number((quantity * 1000).toFixed(3))} gm`;
  }

  return `${Number(quantity.toFixed(3))} ${unit}`;
}

function getProductId(item) {
  const product = getProduct(item);
  return (
    item?.productId ??
    product?.id ??
    product?.productId ??
    item?.id
  );
}

function getItemTotal(item) {
  const explicitTotal = item?.subtotal ?? item?.totalPrice;

  if (
    explicitTotal != null &&
    Number.isFinite(Number(explicitTotal))
  ) {
    return Number(explicitTotal);
  }

  return getProductPrice(item) * getQuantity(item);
}

function getProfileName(profile) {
  return String(profile?.name || profile?.fullName || "");
}

function getProfilePhone(profile) {
  return String(
    profile?.phone ||
      profile?.mobile ||
      profile?.phoneNumber ||
      ""
  );
}

function getProfileAddress(profile) {
  if (!profile) return "";

  const address = profile.address;

  if (typeof address === "string") {
    return address.trim();
  }

  if (address && typeof address === "object") {
    return [
      address.addressLine,
      address.city,
      address.state,
      address.pincode,
    ].filter(Boolean).join(", ");
  }

  return [
    profile.addressLine,
    profile.city,
    profile.state,
    profile.pincode,
  ].filter(Boolean).join(", ");
}

function getOrderId(order) {
  return order?.orderId ?? order?.id ?? null;
}

function getResponseOrder(data) {
  return (
    data?.order ??
    data?.data?.order ??
    data?.data?.data?.order ??
    data?.orderDetails ??
    (data?.orderId != null || data?.id != null ? data : null)
  );
}

function getPaymentStatus(data) {
  const status =
    data?.paymentStatus ??
    data?.payment?.paymentStatus ??
    data?.order?.paymentStatus ??
    data?.order?.payment?.paymentStatus ??
    data?.data?.paymentStatus ??
    data?.data?.payment?.paymentStatus ??
    data?.data?.order?.paymentStatus ??
    data?.data?.order?.payment?.paymentStatus ??
    "";

  return String(status).toUpperCase();
}

function getQrImage(data, order) {
  const value =
    data?.qrImageUrl ??
    data?.qrCodeUrl ??
    data?.qrImage ??
    data?.qrCode ??
    data?.payment?.qrImageUrl ??
    data?.payment?.qrCodeUrl ??
    data?.data?.qrImageUrl ??
    data?.data?.qrCodeUrl ??
    order?.qrImageUrl ??
    order?.qrCodeUrl ??
    order?.payment?.qrImageUrl ??
    order?.payment?.qrCodeUrl;

  return typeof value === "string" && value.trim()
    ? value.trim()
    : DEFAULT_QR_IMAGE;
}

export default function Checkout() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [cart, setCart] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [confirmingPayment, setConfirmingPayment] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [createdOrder, setCreatedOrder] = useState(null);
  const [qrImage, setQrImage] = useState(DEFAULT_QR_IMAGE);
  const [qrImageFailed, setQrImageFailed] = useState(false);

  const loadCheckoutData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [profileResponse, cartResponse] = await Promise.all([
        api.get("/profile"),
        api.get("/cart"),
      ]);

      const profileData = profileResponse.data;
      const cartData = cartResponse.data;

      const actualProfile =
        profileData?.profile ??
        profileData?.data?.profile ??
        profileData?.user ??
        profileData?.data?.user ??
        profileData?.data ??
        profileData;

      const actualCart =
        cartData?.cart ??
        cartData?.data?.cart ??
        cartData?.data ??
        cartData;

      setProfile(actualProfile || null);
      setCart(actualCart || null);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCheckoutData();
  }, [loadCheckoutData]);

  const items = getCartItems(cart);

  const subtotal = Number(
    cart?.totalAmount ??
      cart?.subtotal ??
      items.reduce((sum, item) => sum + getItemTotal(item), 0)
  );

  const profileName = getProfileName(profile);
  const profilePhone = getProfilePhone(profile);
  const profileAddress = getProfileAddress(profile);

  const profileComplete = Boolean(
    profileName.trim() &&
      profilePhone.trim() &&
      profileAddress.trim()
  );

  const orderId = getOrderId(createdOrder);

  const totalAmount = Number(
    createdOrder?.totalAmount ??
      createdOrder?.total ??
      createdOrder?.grandTotal ??
      subtotal
  );

  // Selecting Online Payment immediately displays the QR section.
  const selectPaymentMethod = (method) => {
    if (createdOrder || placingOrder || confirmingPayment) return;

    setPaymentMethod(method);
    setError("");
    setSuccess("");

    if (method === "ONLINE") {
      setQrImage(DEFAULT_QR_IMAGE);
      setQrImageFailed(false);
    }
  };

  // Continue to Online Payment creates the order.
  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!profileComplete) {
      setError(
        "Please update your name, mobile number, and delivery address in your profile before checkout."
      );
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty. Add products before checking out.");
      return;
    }

    try {
      setPlacingOrder(true);

      const response = await api.post("/orders/checkout", {
        paymentMethod,
      });

      const data = response.data || {};
      const order = getResponseOrder(data);

      if (
        data.success === false ||
        !order ||
        !getOrderId(order)
      ) {
        throw new Error(
          data.message ||
            "The server did not return a valid order ID. Check the backend response."
        );
      }

      if (paymentMethod === "COD") {
        navigate(`/orders/${getOrderId(order)}`, {
          replace: true,
        });
        return;
      }

      setCreatedOrder(order);
      setQrImage(getQrImage(data, order));
      setQrImageFailed(false);

      setSuccess(
        `Order #${getOrderId(order)} created. Complete your UPI payment, then select Confirm Payment & Notify Admin.`
      );
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setPlacingOrder(false);
    }
  };

  // Confirm the payment after an order ID exists.
  const handleVerifyPayment = async () => {
    if (!orderId) {
      setError(
        "First click Continue to Online Payment to create your order. You can then confirm payment."
      );
      return;
    }

    setError("");
    setSuccess("");
    setConfirmingPayment(true);

    try {
      const response = await api.post(
        `/orders/${orderId}/payment/confirm`
      );

      const data = response.data || {};
      const status = getPaymentStatus(data);

      if (data.success === false || status !== "PAID") {
        setError(
          data.message ||
            "Payment has not been confirmed. Please check the payment status and try again."
        );
        return;
      }

      setSuccess(
        `Payment status is PAID for Order #${orderId}.`
      );

      navigate(`/orders/${orderId}`, {
        replace: true,
        state: {
          paymentConfirmed: true,
          paymentStatus: "PAID",
        },
      });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setConfirmingPayment(false);
    }
  };

  if (loading) {
    return (
      <main className="checkout-page">
        <div className="checkout-state">
          <span className="checkout-spinner" />
          <p>Preparing your checkout...</p>
        </div>
      </main>
    );
  }

  if (error && !profile && !cart) {
    return (
      <main className="checkout-page">
        <div className="checkout-state">
          <span className="checkout-state-icon">!</span>
          <h2>Unable to load checkout</h2>
          <p>{error}</p>
          <button
            type="button"
            className="checkout-primary-button"
            onClick={loadCheckoutData}
          >
            Try Again
          </button>
          <Link to="/cart" className="checkout-back-link">
            Return to Cart
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <header className="checkout-heading">
        <div>
          <span className="checkout-eyebrow">ALMOST THERE</span>
          <h1>Checkout</h1>
          <p>Review your delivery details and confirm your order.</p>
        </div>

        <div className="checkout-progress">
          <span className="checkout-progress-done">✓ Cart</span>
          <span className="checkout-progress-line" />
          <span className="checkout-progress-current">2. Checkout</span>
          <span className="checkout-progress-line" />
          <span>3. Confirmation</span>
        </div>
      </header>

      {error && (
        <div className="checkout-alert" role="alert">
          <span>!</span>
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="checkout-success-message" role="status">
          {success}
        </div>
      )}

      {items.length === 0 && !createdOrder ? (
        <section className="checkout-empty">
          <span className="checkout-empty-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Add some products before proceeding to checkout.</p>
          <Link to="/products" className="checkout-primary-button">
            Browse Products →
          </Link>
        </section>
      ) : (
        <form className="checkout-layout" onSubmit={handlePlaceOrder}>
          <div className="checkout-main">
            {/* DELIVERY DETAILS */}
            <section className="checkout-card">
              <div className="checkout-card-heading">
                <span className="checkout-number">01</span>
                <div>
                  <h2>Delivery Details</h2>
                  <p>Delivery address saved in your profile.</p>
                </div>
              </div>

              {profileComplete ? (
                <div className="checkout-address-card">
                  <div className="checkout-address-icon">📍</div>
                  <div className="checkout-address-content">
                    <span className="checkout-address-label">
                      DELIVERING TO
                    </span>
                    <h3>{profileName}</h3>
                    <p>{profilePhone}</p>
                    <p>{profileAddress}</p>
                  </div>

                  {!createdOrder && (
                    <Link to="/profile" className="checkout-edit-link">
                      Edit
                    </Link>
                  )}
                </div>
              ) : (
                <div className="checkout-profile-warning">
                  <span>!</span>
                  <div>
                    <strong>Complete your delivery details</strong>
                    <p>
                      Your name, mobile number, and delivery address
                      are required before ordering.
                    </p>
                    <Link to="/profile">Update My Profile →</Link>
                  </div>
                </div>
              )}

              <p className="checkout-address-note">
                Update your profile before placing an order if your
                address needs changing.
              </p>
            </section>

            {/* PAYMENT METHODS */}
            {!createdOrder && (
              <section className="checkout-card">
                <div className="checkout-card-heading">
                  <span className="checkout-number">02</span>
                  <div>
                    <h2>Payment Method</h2>
                    <p>Choose how you would like to pay.</p>
                  </div>
                </div>

                <div className="checkout-payment-options">
                  <label
                    className={`checkout-payment-option ${
                      paymentMethod === "COD" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={() => selectPaymentMethod("COD")}
                    />
                    <span className="checkout-payment-icon">💵</span>
                    <span className="checkout-payment-text">
                      <strong>Cash on Delivery</strong>
                      <small>Pay when your order arrives.</small>
                    </span>
                    <span className="checkout-payment-check">
                      {paymentMethod === "COD" ? "✓" : ""}
                    </span>
                  </label>

                  <label
                    className={`checkout-payment-option ${
                      paymentMethod === "ONLINE" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ONLINE"
                      checked={paymentMethod === "ONLINE"}
                      onChange={() => selectPaymentMethod("ONLINE")}
                    />
                    <span className="checkout-payment-icon">📱</span>
                    <span className="checkout-payment-text">
                      <strong>Online Payment (UPI QR)</strong>
                      <small>
                        Select this option to display the QR code
                        and payment confirmation button.
                      </small>
                    </span>
                    <span className="checkout-payment-check">
                      {paymentMethod === "ONLINE" ? "✓" : ""}
                    </span>
                  </label>
                </div>

                {paymentMethod === "ONLINE" && (
                  <p className="checkout-online-warning">
                    Scan the QR code. First create your order using
                    Continue to Online Payment. The confirmation
                    button is shown below and will become enabled
                    once the order is created.
                  </p>
                )}
              </section>
            )}

            {/* ORDER ITEMS */}
            <section className="checkout-card">
              <div className="checkout-card-heading">
                <span className="checkout-number">03</span>
                <div>
                  <h2>Order Items</h2>
                  <p>Check your products and quantities.</p>
                </div>
              </div>

              <div className="checkout-items">
                {items.map((item, index) => {
                  const name = getProductName(item);
                  const id = getProductId(item) ?? `${name}-${index}`;

                  return (
                    <div className="checkout-item" key={id}>
                      <div className="checkout-item-info">
                        <h3>{name}</h3>
                        <p>
                          Quantity: {formatDisplayQuantity(item)}
                        </p>
                      </div>
                      <strong>{formatPrice(getItemTotal(item))}</strong>
                    </div>
                  );
                })}
              </div>

              {!createdOrder && (
                <Link to="/cart" className="checkout-edit-cart">
                  ← Edit Cart
                </Link>
              )}
            </section>

            {/* ONLINE PAYMENT: QR AND CONFIRM BUTTON ARE VISIBLE IMMEDIATELY */}
            {paymentMethod === "ONLINE" && (
              <section className="checkout-card checkout-qr-card">
                <div className="checkout-card-heading">
                  <span className="checkout-number">04</span>
                  <div>
                    <h2>Pay Online Using UPI</h2>
                    <p>
                      {orderId
                        ? `Order #${orderId}`
                        : "Scan the QR code to make your payment"}
                    </p>
                  </div>
                </div>

                <div className="checkout-qr-content">
                  <p>
                    Open a UPI application on another device and scan
                    this QR code.
                  </p>

                  {!qrImageFailed ? (
                    <img
                      src={qrImage}
                      alt="UPI payment QR code"
                      className="checkout-qr-image"
                      onError={() => setQrImageFailed(true)}
                    />
                  ) : (
                    <div className="checkout-qr-image-error">
                      <strong>QR image could not be loaded</strong>
                      <p>
                        Add a valid image at public/upi_qr.png or
                        return a valid QR image URL from your backend.
                      </p>
                    </div>
                  )}

                  <strong className="checkout-qr-total">
                    {createdOrder ? "Order Total: " : "Cart Total: "}
                    {formatPrice(totalAmount)}
                  </strong>

                  {!createdOrder && (
                    <p className="checkout-qr-note">
                      Your order has not been created yet. Click
                      Continue to Online Payment in the order summary.
                      The QR image must be configured for your UPI
                      payment account.
                    </p>
                  )}

                  {createdOrder && (
                    <p className="checkout-qr-note">
                      After completing your payment, select Confirm
                      Payment & Notify Admin.
                    </p>
                  )}

                  {/* ALWAYS VISIBLE FOR ONLINE PAYMENT */}
                  <button
                    type="button"
                    className="checkout-place-button checkout-confirm-payment-button"
                    onClick={handleVerifyPayment}
                    disabled={
                      !orderId ||
                      placingOrder ||
                      confirmingPayment
                    }
                    title={
                      !orderId
                        ? "Create your order first using Continue to Online Payment"
                        : "Confirm payment"
                    }
                  >
                    {confirmingPayment
                      ? "Confirming Payment..."
                      : "✓ Confirm Payment & Notify Admin"}
                  </button>

                  {!orderId && (
                    <p className="checkout-payment-admin-note">
                      Create your order first. This button will become
                      enabled after the backend returns the order ID.
                    </p>
                  )}

                  {orderId && (
                    <p className="checkout-payment-admin-note">
                      Order #{orderId} is created. The backend must
                      verify the real payment before marking it PAID
                      and notifying the admin.
                    </p>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* ORDER SUMMARY */}
          <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-summary-line">
              <span>Products</span>
              <strong>{items.length}</strong>
            </div>

            <div className="checkout-summary-line">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <div className="checkout-summary-line">
              <span>Delivery Fee</span>
              <span className="checkout-fee-note">
                Free home delivery
              </span>
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-summary-total">
              <span>{createdOrder ? "Order Total" : "Cart Total"}</span>
              <strong>{formatPrice(totalAmount)}</strong>
            </div>

            <p className="checkout-summary-note">
              Enjoy free home delivery on your order!
            </p>

            {!createdOrder && (
              <>
                <button
                  type="submit"
                  className="checkout-place-button"
                  disabled={
                    placingOrder ||
                    items.length === 0 ||
                    !profileComplete
                  }
                >
                  {placingOrder
                    ? "Processing..."
                    : paymentMethod === "COD"
                      ? "Place COD Order"
                      : "Continue to Online Payment"}

                  {!placingOrder && (
                    <span aria-hidden="true">→</span>
                  )}
                </button>

                {!profileComplete && (
                  <p className="checkout-required-note">
                    Update your profile to enable order placement.
                  </p>
                )}

                <div className="checkout-secure-note">
                  <span>🔒</span>
                  <span>
                    Your order is submitted to FreshNest securely.
                  </span>
                </div>

                <Link to="/cart" className="checkout-back-link">
                  Return to Cart
                </Link>
              </>
            )}
          </aside>
        </form>
      )}
    </main>
  );
}