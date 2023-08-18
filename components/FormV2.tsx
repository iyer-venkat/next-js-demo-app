"use client";
import { useRef, useCallback, useState, useEffect } from "react";
import ReCaptcha, { ReCAPTCHA, ReCAPTCHAProps } from "react-google-recaptcha";
import styles from "../styles/Home.module.css";

const FormV2 = ({
  invisible,
  siteKey,
}: {
  invisible?: boolean;
  siteKey: string;
}) => {
  const captchaRef = useRef<ReCAPTCHA>(null);

  const [token, setToken] = useState<string | null>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState("");

  const verifyToken = (token: string | null) => {
    console.log("called", token);
    setToken(token);
  };

  const submitEnquiryForm = useCallback(
    (gReCaptchaToken?: string | null) => {
      fetch("/api/V2/enquiry", {
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
          invisible: !!invisible,
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
        })
        .finally(() => {
          captchaRef.current?.reset();
          setName("");
          setEmail("");
          setMessage("");
          setToken(null);
        });
    },
    [name, email, message, invisible]
  );

  const handleSumitForm = useCallback(
    (e: any) => {
      e.preventDefault();

      if (!token && !!invisible) captchaRef.current?.execute();
      else submitEnquiryForm(token);
    },
    [token, invisible, submitEnquiryForm]
  );

  useEffect(() => {
    if (token && invisible) submitEnquiryForm(token);
  }, [token, invisible, submitEnquiryForm]);

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
          <ReCaptcha
            sitekey={siteKey}
            ref={captchaRef}
            onChange={verifyToken}
            size={!!invisible ? "invisible" : "normal"}
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

export default FormV2;
