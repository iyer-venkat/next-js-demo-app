"use client";
import FormV3 from "@/components/FormV3";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const ReCaptchaV3 = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="6LcxNl8nAAAAAKbnfk2uyNd4AjtJX8z2LujLUyop"
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <FormV3 />
    </GoogleReCaptchaProvider>
  );
};

export default ReCaptchaV3;
