import { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import styles from "../styles/Home.module.css";

const FormV3 = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState("");

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSumitForm = useCallback(
    (e: any) => {
      e.preventDefault();

      const submitEnquiryForm = (gReCaptchaToken: string) => {
        fetch("/api/V3/enquiry", {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            gRecaptchaToken: gReCaptchaToken,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res, "response from backend");
            if (res?.status === "success") {
              setNotification(res?.message);
            } else {
              setNotification(res?.message);
            }
          });
      };

      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      executeRecaptcha("enquiryFormSubmit").then((gReCaptchaToken) => {
        console.log(gReCaptchaToken, "response Google reCaptcha server");
        submitEnquiryForm(gReCaptchaToken);
      });
    },
    [executeRecaptcha, name, email, message]
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2>Enquiry Form</h2>
        <form onSubmit={handleSumitForm}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e?.target?.value)}
            className="form-control mb-3"
            placeholder="Name"
          />
          <br />
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e?.target?.value)}
            className="form-control mb-3"
            placeholder="Email"
          />
          <br />
          <textarea
            rows={3}
            // type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            className="form-control mb-3"
            placeholder="Message"
          />
          <br />
          <button type="submit" className="btn btn-light">
            Submit
          </button>

          {notification && <p>{notification}</p>}
        </form>
      </main>
    </div>
  );
};

export default FormV3;
