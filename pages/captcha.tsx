import ReCaptcha, { ReCAPTCHA, ReCAPTCHAProps } from "react-google-recaptcha";
import useAxios from "axios-hooks";
import { useRef, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
// import styles from "../styles/Home.module.css";
import EnquiryForm from "@/components/Form";

const Recaptcha = () => {
  const [hideV2, setHideV2] = useState(false);

  const url =
    // "https://www.google.com/recaptcha/api/siteverify?secret=6LcC9VknAAAAADYmZFj0q3lOWNLmv1mbV1ozOhBE";
    "https://www.google.com/recaptcha/api/siteverify?s3ecret=6Let67EnAAAAAHiNHpOFg6XEhuaa_N2nb63vnVbm";
  const [reCaptchaProps, verifyCaptcha] = useAxios(
    {
      url,
      method: "POST",
    },
    {
      manual: true,
    }
  );

  const captchaRef = useRef<ReCAPTCHA>(null);

  const verifyToken = async (token: string | null) => {
    console.log("verifyToken", token, captchaRef.current?.execute());

    await verifyCaptcha({
      url: `${url}&response=${token}`,
    });
  };

  console.log(hideV2, reCaptchaProps);
  return (
    <>
      <input
        type="checkbox"
        checked={hideV2}
        onChange={(e) => setHideV2(!hideV2)}
      />
      Hide V2 Captcha <br />
      <ReCaptcha
        // sitekey="6LcC9VknAAAAALPsF1B54tDgcZWVa0hRrVZKicCT"
        sitekey="6Let67EnAAAAAO8c72wBjqsrDrRQao7ReDr1EKoE"
        ref={captchaRef}
        onChange={verifyToken}
        size="invisible"
      />
      <br />
      {/* <GoogleReCaptchaProvider
        reCaptchaKey="6LcxNl8nAAAAAKbnfk2uyNd4AjtJX8z2LujLUyop"
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      > */}
      <EnquiryForm verifyToken={verifyToken} />
      {/* </GoogleReCaptchaProvider> */}
    </>
  );
};

export default Recaptcha;
