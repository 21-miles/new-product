import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MoveRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
const Feedback = ({
  email,
  peopleA,
  peopleAWhats,
  loadingForm,
  honey,
  success,
  btnClick,
  location,
  searchParams,
  refPeopleA,
  refEmail,
  emailSuccess,
  peopleASuccess,
  peopleAWhatsSuccess,
  handleKeyDown,
  handlePeopleAChange,
  handleEmailChange,
  handleHoneypotChange,
  handleSubmit,
  handlePeopleAWhatsChange,
  successMsg,
  elementID,
  feedbackHeading,
  yourName,
  yourEmail,
  yourMessage,
  sendRequest,
}) => {
  return (
    <div className="w-full py-10 lg:py-32 mb-96block">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2 z-10 relative">
          <div className="flex gap-4 flex-col">
            <div>
              <Badge variant="outline">Fale Conosco</Badge>
            </div>
            <div className="flex gap-4 flex-col">
              <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
                Podemos <strong>ajudar</strong>?
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                Use o formulário para entrar em contato com a gente.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1">
            {/* {loadingForm === false && success === null
        ? "CARREGANDO RESPOSTA ..."
        : null} */}
            {success === false && loadingForm === true ? (
              <form
                onSubmit={handleSubmit}
                method="POST"
                id={`${elementID ? elementID : ""}`}
                name="cb-contact-form"
                className="validate feedback feedback-inner grid grid-cols-1"
                data-netlify="true"
                netlify-honeypot="botField"
                noValidate
              >
                <Label htmlFor="PEOPLEA">{yourName}</Label>
                <Input
                  onKeyDown={(e) => handleKeyDown(e)}
                  // ref={refPeopleA}
                  placeholder={yourName}
                  type="text"
                  name="PEOPLEA"
                  id="PEOPLEA"
                  onMouseDown={(e) => handleKeyDown(e)}
                  className={`${
                    peopleASuccess === true
                      ? "success-color"
                      : peopleA === ""
                      ? ""
                      : "error-color"
                  }`}
                  onChange={(e) => handlePeopleAChange(e.target.value)}
                />
                <Label htmlFor="EMAIL">{yourEmail}</Label>
                <Input
                  onKeyDown={(e) => handleKeyDown(e)}
                  placeholder={yourEmail}
                  type="email"
                  onMouseDown={(e) => handleKeyDown(e)}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  // ref={(element) => {
                  //   if (element)
                  //     element.style.setProperty(
                  //       "background",
                  //       "transparent",
                  //       "important"
                  //     );
                  // }}
                  defaultValue={email}
                  name="EMAIL"
                  className={`required email ${
                    emailSuccess === true
                      ? "success-color"
                      : email === ""
                      ? ""
                      : "error-color"
                  }`}
                  id="EMAIL"
                  required
                />

                <Label htmlFor="peopleAWhats" className={``}>
                  {yourMessage}
                </Label>
                <Textarea
                  placeholder="Escreva a sua mensagem aqui."
                  className={`${
                    peopleAWhatsSuccess === true
                      ? "success-color"
                      : peopleAWhats === ""
                      ? ""
                      : "error-color"
                  } flex min-h-[60px] w-full rounded-md border border-input bg-transparent text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 p-4`}
                  id="peopleAWhats"
                  name="peopleAWhats"
                  rows="1"
                  cols="33"
                  onKeyDown={(e) => handleKeyDown(e)}
                  onMouseDown={(e) => handleKeyDown(e)}
                  onChange={(e) => handlePeopleAWhatsChange(e.target.value)}
                  value={peopleAWhats}
                ></Textarea>
                <span className="hidden">
                  <label>
                    Don’t fill this out if you’re human:{" "}
                    <input
                      name="botField"
                      onChange={(e) => handleHoneypotChange(e.target.value)}
                      value={honey}
                    />
                    <input
                      type="hidden"
                      name="form-name"
                      value="cb-contact-form"
                    />
                    <input
                      name="landingUrl"
                      defaultValue={location?.pathname}
                    />
                    <input name="searchUrl" defaultValue={searchParams} />
                    {/* <input
                      name='logoImage'
                      defaultValue={logoQuery.images.fallback.src}
                    />
                   */}
                    <input name="siteUrl" defaultValue={"https://edu4.dev"} />
                    <input name="nowDate" defaultValue={new Date()} />
                  </label>
                </span>
                {/* <button>Send a request</button> */}
              </form>
            ) : null}
            {loadingForm === false ? <p>{successMsg || null}</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Feedback;
