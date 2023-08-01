import ReCaptcha, { ReCAPTCHA, ReCAPTCHAProps } from "react-google-recaptcha";
import useAxios from "axios-hooks";
import { useRef } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import styles from "../styles/Home.module.css";
import EnquiryForm from "@/components/Form";

const Recaptcha = () => {
  const url =
    "https://www.google.com/recaptcha/api/siteverify?secret=";
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
    console.log("verifyToken", token);

    await verifyCaptcha({
      url: `${url}&response=${token}`,
    });
  };

  console.log(reCaptchaProps);
  return (
    <>
      <ReCaptcha
        sitekey=""
        ref={captchaRef}
        onChange={verifyToken}
      />
      <br />
      <GoogleReCaptchaProvider
        reCaptchaKey=""
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
          nonce: undefined,
        }}
      >
        <EnquiryForm />
      </GoogleReCaptchaProvider>
    </>
  );
};

export default Recaptcha;
