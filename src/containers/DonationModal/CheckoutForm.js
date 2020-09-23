import React, { useState, useEffect, useRef } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.scss";

import LilPipSmiling from "../../assets/images/svg/lilPipSmiling.svg";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#fff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Montserrat, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#9feeff",
      },
    },
    invalid: {
      iconColor: "#fce883",
      color: "#fce883",
    },
  },
};

const CardField = ({ onChange }) => (
  <div className={"FormRow"}>
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      onKeyPress={(e) => {
        e.key === "Enter" && e.preventDefault();
      }}
    />
  </div>
);

const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    {children}
  </div>
);

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loadedStripe, setLoadedStripe] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    name: "",
  });
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [donationAmount, setDonationAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [randomNamePlaceholder, setRandomNamePlaceholder] = useState("");
  const [confirmationMode, setConfirmationMode] = useState(false);

  const customAmountInput = useRef(null);

  useEffect(() => {
    if (props.showing) {
      setSucceeded(false);
      setError(null);
      setCardComplete(false);
      setProcessing(false);
      setPaymentMethod(null);
      setBillingDetails({
        name: "",
      });
      setEmail("");
      setDisabled(true);
      setDonationAmount(0);
      setCustomAmount(0);
      const card = elements ? elements.getElement(CardElement) : null;
      if (card) {
        card.clear();
      } else {
        setLoadedStripe(false);
      }
      setConfirmationMode(false);

      setRandomNamePlaceholder(() => {
        const names = [
          "Albert Einstein",
          "Marie Curie",
          "Isaac Newton",
          "Michael Faraday",
          "Richard Feynman",
          "Emmy Noether",
          "Carl Sagan",
          "Max Planck",
          "Galileo Galilei",
          "Rosalind Franklin",
        ];
        return names[Math.floor(Math.random() * names.length)];
      });
    }
  }, [props.showing]);

  useEffect(() => {
    if (confirmationMode) {
      setConfirmationMode(false);
    }

    if (props.showing) {
      window
        .fetch(
          "https://polar-everglades-89611.herokuapp.com/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: [{ id: { donationAmount } }],
            }),
          }
        )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    }
  }, [donationAmount, props.showing]);

  const AmountButton = ({ processing, error, amount, disabled }) => (
    <button
      className={`AmountButton ${
        amount === donationAmount ? "AmountButtonSelected" : ""
      } ${error ? "AmountButton--error" : ""}`}
      disabled={processing || disabled}
      onClick={(e) => {
        e.preventDefault();
        if (error === "Amount cannot be over $999,999") {
          setError(null);
        }
        setDonationAmount((prev) => {
          setCustomAmount(0);
          if (prev === amount) return 0;
          return amount;
        });
      }}
    >
      ${amount}
    </button>
  );

  const handleCustomAmountChange = (e) => {
    e.preventDefault();
    if (e.target.validity.valid) {
      if (e.target.value < 1000000) {
        setCustomAmount(e.target.value);
        setDonationAmount(e.target.value);

        if (error === "Amount cannot be over $999,999") {
          setError(null);
        }
      } else {
        setError("Amount cannot be over $999,999");
      }
    }
  };

  const CustomAmountButton = ({ processing, error, disabled }) => (
    <button
      className={`CustomAmountButton ${
        customAmount > 0 ? "CustomAmountButtonSelected" : ""
      } ${error ? "CustomAmountButton--error" : ""}`}
      disabled={processing || disabled}
      onClick={(e) => {
        e.preventDefault();
        // setDonationAmount((prev) => {
        //   // if (prev === amount) return 0;
        //   return 0;
        // });
      }}
    >
      $
      <input
        type="text"
        value={customAmount}
        onChange={handleCustomAmountChange}
        className={"CustomAmountTextField"}
      ></input>
    </button>
  );

  const SubmitButton = ({
    processing,
    error,
    children,
    disabled,
    confirmationMode,
  }) => (
    <button
      className={`SubmitButton ${
        confirmationMode ? "SubmitButtonConfirmation" : ""
      } ${processing ? "SubmitButtonProcessing" : ""} ${
        error ? "SubmitButton--error" : ""
      }`}
      type="submit"
      disabled={processing || disabled}
    >
      {processing ? "Processing..." : children}
    </button>
  );

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (cardComplete) {
      if (!confirmationMode) {
        setConfirmationMode(true);
      } else {
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
          receipt_email: email,
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: ev.target.name.value,
            },
          },
        });
        if (payload.error) {
          setError(`Payment failed: ${payload.error.message}`);
          setProcessing(false);
          setConfirmationMode(false);
        } else {
          setError(null);
          setProcessing(false);
          setSucceeded(true);
          setConfirmationMode(false);
        }
      }
    } else {
      setError("Please enter your payment details");
    }
  };

  return succeeded ? (
    <div className="ResultGroup">
      <img className="ResultImageHeader" src={LilPipSmiling} />
      <div className="Result">
        <div className="ResultTitle" role="alert">
          Donation successful!
        </div>
        <div className="ResultMessage">
          {`Thank you for your contribution of $${donationAmount}. Your donation helps us provide learning resources free of charge for students and teachers across the universe... and more!`}
        </div>
      </div>
    </div>
  ) : (
    <form className="Form" onSubmit={handleSubmit}>
      <h1 className="CheckoutHeader">
        {loadedStripe
          ? "Your contribution keeps us going!"
          : "Connection error"}
      </h1>
      {loadedStripe ? (
        <p className="CheckoutSubheader">
          Universe & More is a 501c3 educational nonprofit. All donations are
          tax-deductible.
        </p>
      ) : (
        <p className="CheckoutSubheader">
          Please check your network and try again.
        </p>
      )}
      <fieldset className="FormGroup">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder={randomNamePlaceholder}
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
            if (confirmationMode) {
              setConfirmationMode(false);
            }
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="ilovephysics@email.com"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (confirmationMode) {
              setConfirmationMode(false);
            }
          }}
        />
      </fieldset>
      <fieldset className="FormGroup FormGroupCard">
        <CardField
          onChange={(e) => {
            setError(() => {
              if (e.error) {
                return e.error.message;
              } else return null;
            });
            setCardComplete(e.complete);
            if (confirmationMode) {
              setConfirmationMode(false);
            }
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="AmountButtons">
        <AmountButton
          processing={processing}
          error={error}
          disabled={!stripe}
          amount={5}
        />
        <AmountButton
          processing={processing}
          error={error}
          disabled={!stripe}
          amount={20}
        />
        <AmountButton
          processing={processing}
          error={error}
          disabled={!stripe}
          amount={50}
        />
        <AmountButton
          processing={processing}
          error={error}
          disabled={!stripe}
          amount={100}
        />
        <AmountButton
          processing={processing}
          error={error}
          disabled={!stripe}
          amount={250}
        />
        <button
          className={`CustomAmountButton ${
            customAmount > 0 ? "CustomAmountButtonSelected" : ""
          } ${error ? "CustomAmountButton--error" : ""}`}
          disabled={processing || !stripe}
          onClick={(e) => {
            e.preventDefault();
            if (customAmount === 0) {
              setDonationAmount(0);
            }
            customAmountInput.current.focus();
          }}
        >
          $
          <input
            type="text"
            ref={customAmountInput}
            pattern="[0-9]*"
            value={customAmount > 0 ? customAmount : ""}
            onChange={handleCustomAmountChange}
            className={"CustomAmountTextField"}
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
          ></input>
        </button>
      </div>
      <SubmitButton
        processing={processing}
        error={error}
        disabled={!stripe || donationAmount < 1}
        confirmationMode={confirmationMode}
      >
        {donationAmount < 1
          ? "Select an amount"
          : confirmationMode
          ? `Confirm $${donationAmount} donation`
          : `Donate $${donationAmount}`}
      </SubmitButton>
    </form>
  );
};

export default CheckoutForm;
