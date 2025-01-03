import React, { useRef, useState, Suspense } from "react";
import fetch from "cross-fetch";

import { usePathname, useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";
// import VMasker from "vanilla-masker";
// import moment from "moment";
// import "moment/locale/pt-br";
import general from "../content/general.json";

import Feedback from "../components/Feedback";
export function validateEmail(email) {
  if (email.slice(-1) === ".") {
    return false;
  }
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export function validateDate(input) {
  const reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  const dates = input.split("/");
  if (parseInt(dates[2]) > 2022) {
    return reg.test(String(input).toLowerCase());
  } else {
    return false;
  }
}
const FeedbackContainer = ({
  emailPage,
  emailFolder,
  subject,
  conversionID,
  elementID,
  gtagCounter,
  feedbackHeading,
  yourName,
  yourEmail,
  yourMessage,
  sendRequest,
}) => {
  const [btnClick, setBtnClick] = useState(null);
  const [email, setEmail] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);
  // const [date, setDate] = useState("");
  // const [dateSuccess, setDateSuccess] = useState(false);
  const [peopleA, setPeopleA] = useState("");
  const [peopleASuccess, setPeopleASuccess] = useState(false);

  const [peopleAWhats, setPeopleAWhats] = useState("");
  const [peopleAWhatsSuccess, setPeopleAWhatsSuccess] = useState(false);

  const [honey, setHoney] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(general.errorMessage);

  // const [countdown, setCountdown] = useState([12, 60, 60]);
  // const [promoEnd, setPromoEnd] = useState(false);

  const [loadingForm, setLoadingForm] = useState(true);

  // const router = useRouter();

  const location = usePathname();
  const searchParams = useSearchParams().toString();

  // useRef

  const refEmail = useRef();
  const refPeopleA = useRef();
  // const refWhatsPeopleA = useRef();

  const feedbackFolder = emailFolder;

  const cookies = new Cookies();

  // const hasSuccessCookies =
  //   cookies.get("successValue") ||
  //   cookies.set("successValue", null, {
  //     path: "/",
  //   });

  // const cookiesValues =
  //   cookies.get("submitedValues") && hasSuccessCookies
  //     ? cookies.get("submitedValues")
  //     : cookies.set("submitedValues", null, {
  //         path: "/",
  //       });

  // const sentMCCookies =
  //   cookies.get("cookiesSentMC") ||
  //   cookies.set("cookiesSentMC", null, {
  //     path: "/",
  //   });

  const handlePeopleAWhatsChange = (peopleAWhatsTyping) => {
    setPeopleAWhats(peopleAWhatsTyping);
    if (peopleAWhatsTyping.length >= 2 && peopleAWhats !== "") {
      return setPeopleAWhatsSuccess(true);
    } else {
      return setPeopleAWhatsSuccess(false);
    }
  };

  const handlePeopleAChange = (peopleATyping) => {
    setPeopleA(peopleATyping);
    if (peopleATyping.length >= 2) {
      return setPeopleASuccess(true);
    } else {
      return setPeopleASuccess(false);
    }
  };
  const handleEmailChange = (emailTyping) => {
    setEmail(emailTyping);
    const validatedEmail = validateEmail(emailTyping);
    if (validatedEmail) {
      return setEmailSuccess(true);
    } else {
      return setEmailSuccess(false);
    }
  };
  const handleHoneypotChange = (honeyTyping) => {
    setHoney(honeyTyping);
  };

  function handleClick(e, clickedBtn) {
    if (e) {
      e.preventDefault();
    }

    return setBtnClick(clickedBtn);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      handleClick(event, null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoadingForm(false);

    setSuccessMsg("Sending message ...");
    setTimeout(() => {}, 1000);
    const myForm = event.target;
    const formData = new FormData(myForm);
    let landingUrl = myForm["landingUrl"].value;
    const botFieldPrevent = myForm["searchUrl"].value !== "" || false;
    const landingSlashCheck = landingUrl.slice(-1) === "/" || false;

    if (!formData) {
      return console.log({
        message: "No body was sent. Try a POST request or query",
      });
    }
    if (myForm["botField"].value !== "") {
      console.log("bot field detected");
      return console.log(myForm["botField"].value);
    }
    if (botFieldPrevent) {
      return console.log({ message: "You shouldn't be here!" });
    }

    if (landingSlashCheck) {
      landingUrl = landingUrl.slice(0, -1);
    }

    const fullUrl = encodeURI(
      `${
        general.siteUrl + landingUrl
      }?success=1&peopleA=${peopleA}&whatsPeopleA=${peopleAWhats}&emailPeopleA=${email}&confirmDate=${new Date()}`
    );
    const now = new Date();

    // cc: emailPage,
    const payload = {
      from: emailPage,
      to: `${email}`,
      subject: subject,
      parameters: {
        prospect: peopleA,
        email: email,
        page: feedbackFolder,
        date: now.toString(),
        msg: peopleAWhats,
      },
    };
    cookies.remove("submitedValues");
    cookies.remove("successValue");

    cookies.set("submitedValues", fullUrl, {
      path: "/",
    });
    cookies.set("successValue", false, {
      path: "/",
    });

    const payload2 = {
      from: emailPage,
      to: "info@ruun.com",
      subject: `[Ruun contact] - E-mail from ${peopleA}`,
      parameters: {
        prospect: peopleA,
        email: email,
        page: feedbackFolder,
        date: now.toString(),
        msg: peopleAWhats,
      },
    };

    await fetch(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}/.netlify/functions/emails/admin`,
      {
        method: "POST",
        headers: {
          "netlify-emails-secret":
            process.env.NEXT_PUBLIC_NETLIFY_EMAILS_SECRET,
        },

        body: JSON.stringify(payload2),
      }
    )
      .then((res) => {
        if (res.status >= 400) {
          return console.log(res);
        }
        gtagCounter(`cb-contact-form-${gtag}`, conversionID);
        return console.log(`gTag form submited in: #cb-contact-form-${gtag}`);
      })
      .catch((err) => {
        return console.error(err);
      });

    await fetch(
      `${process.env.NEXT_PUBLIC_WEBSITE_URL}/.netlify/functions/emails/${emailFolder}`,
      {
        method: "POST",
        headers: {
          "netlify-emails-secret":
            process.env.NEXT_PUBLIC_NETLIFY_EMAILS_SECRET,
        },

        body: JSON.stringify(payload),
      }
    )
      .then((res) => {
        if (res.status >= 400) {
          console.log(res);
          setSuccess(false);
          setLoadingForm(true);
          return setSuccessMsg(general.errorMessage);
          // throw new Error("Bad response from server");
        }
        setLoadingForm(false);
        cookies.set("successValue", true, {
          path: "/",
        });
        setSuccess(true);
        return setSuccessMsg(general.successMessage);
      })
      .catch((err) => {
        console.error(err);
        setLoadingForm(true);
        setSuccess(false);
        return setSuccessMsg(general.errorMessage);
      });
  };

  let queries = [];
  const urlQueries = decodeURI(searchParams).slice(1).split("&");
  urlQueries.map((e, i) => {
    const splitE = e.split("=");
    queries[splitE[0]] = splitE[1];
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Feedback
        emailPage={emailPage}
        email={email}
        peopleA={peopleA}
        peopleAWhats={peopleAWhats}
        honey={honey}
        success={success}
        btnClick={btnClick}
        location={location}
        searchParams={searchParams}
        refPeopleA={refPeopleA}
        refEmail={refEmail}
        emailSuccess={emailSuccess}
        peopleASuccess={peopleASuccess}
        peopleAWhatsSuccess={peopleAWhatsSuccess}
        handleKeyDown={handleKeyDown}
        handlePeopleAChange={handlePeopleAChange}
        handleEmailChange={handleEmailChange}
        handleHoneypotChange={handleHoneypotChange}
        handlePeopleAWhatsChange={handlePeopleAWhatsChange}
        handleSubmit={handleSubmit}
        queries={queries}
        loadingForm={loadingForm}
        successMsg={successMsg}
        elementID={elementID}
        conversionID={conversionID}
        feedbackHeading={feedbackHeading}
        yourName={yourName}
        yourEmail={yourEmail}
        yourMessage={yourMessage}
        sendRequest={sendRequest}
      />
    </Suspense>
  );
};
export default FeedbackContainer;
