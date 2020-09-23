import React, { Component } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import styles from "./NewsletterSignup.module.scss";
import { ReactComponent as EarthMars } from "../../assets/images/svg/earth-mars.svg";

const CustomForm = ({ status, message, onValidated }) => {
  let email;
  const submit = (e) => {
    e.preventDefault();
    email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value,
      });
  };

  return (
    <div className={styles.EmailForm}>
      <div className={styles.Header}>Keep in touch!</div>
      <div className={styles.Subheader}>
        Subscribe to the Universe & More newsletter to receive exclusive updates
        and previews of upcoming resources.
      </div>
      {status === "sending" && (
        <div className={styles.SendingMessage}>sending...</div>
      )}
      {status === "error" && (
        <div
          className={styles.ErrorMessage}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          className={styles.SuccessMessage}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <form onSubmit={submit}>
        <input
          className={styles.EmailInput}
          ref={(node) => (email = node)}
          type="email"
          placeholder="Your email"
        />
        <br />
        <button type="submit" className={styles.SubmitButton}>
          Submit
        </button>
      </form>
      <div className={styles.Footer}>
        We respect your privacy and will never give or sell your email address
        to a third party.
      </div>
    </div>
  );
};

class NewsletterSignup extends Component {
  render() {
    const url =
      "https://universeandmore.us18.list-manage.com/subscribe/post?u=df8a6d57c7217fbce91aea6cc&amp;id=cf08e30b92";
    return (
      <div className={styles.NewsletterSignup}>
        <EarthMars className={styles.EarthMars} />
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <CustomForm
              status={status}
              message={message}
              onValidated={(formData) => subscribe(formData)}
            />
          )}
        />
      </div>
    );
  }
}

export default NewsletterSignup;
