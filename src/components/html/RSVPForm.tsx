import React, { useCallback, useMemo, useState } from "react";
import { send } from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

type Props = {};

const RSVPForm = (props: Props) => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [allergy, setAllergy] = useState<string>("");
  const [inquiry, setInquiry] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const sendEnabled = useMemo(() => name.length > 0 && phone.length > 0 && email.length > 0, [name, phone, email]);

  const sendEmail = useCallback(() => {
    setLoading(true);
    send(process.env.REACT_APP_EMAIL_SERVICE_ID ?? "", process.env.REACT_APP_EMAIL_TEMPLATE_ID ?? "", { name, phone, email, allergy, inquiry }, process.env.REACT_APP_EMAIL_PUBLIC_KEY ?? "").then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setSuccess(true);
        setLoading(false);

        setTimeout(() => {
          navigate("/main");
        }, 1500);
      },
      (error) => {
        console.log("FAILED...", error);
        setLoading(false);
        alert("Failed to send the email! Please try again");
      }
    );
  }, [name, phone, email, allergy, inquiry]);

  return (
    <div className={`pointer-events-auto fixed z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[780px] h-[80vh] max-h-[506px] rounded-[4px] bg-ohi-front shadow-[4px_4px_12px_4px_rgba(0,_0,_0,_0.35)] py-9 px-8 flex gap-5 animate-fadein opacity-0`}>
      <div className={`pointer-events-none flex items-center justify-center w-full h-full text-3xl font-bold text-center font-playfairsc absolute top-0 left-0 ${success ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>Success!</div>
      <div className={`flex flex-col w-2/3 gap-5 ${success ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
        <div className="flex flex-col gap-3 max-w-[280px]">
          <label htmlFor="rsvp-name" className="font-lato font-bold text-[16px] leading-[16px]">
            Name *
          </label>
          <input id="rsvp-name" className="px-3 py-2.5 text-[14px] leading-[16px] outline-none rounded-[4px] bg-[#A9968C] shadow-[2px_2px_6px_0px_#735C50_inset,_-1px_-1px_2px_0px_rgba(255,_255,_255,_0.25)_inset]" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-3 max-w-[280px]">
          <label htmlFor="rsvp-phone" className="font-lato font-bold text-[16px] leading-[16px]">
            Phone number *
          </label>
          <input type="tel" id="rsvp-phone" className="px-3 py-2.5 text-[14px] leading-[16px] outline-none rounded-[4px] bg-[#A9968C] shadow-[2px_2px_6px_0px_#735C50_inset,_-1px_-1px_2px_0px_rgba(255,_255,_255,_0.25)_inset]" onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="flex flex-col gap-3 max-w-[280px]">
          <label htmlFor="rsvp-email" className="font-lato font-bold text-[16px] leading-[16px]">
            Email *
          </label>
          <input type="email" id="rsvp-email" className="px-3 py-2.5 text-[14px] leading-[16px] outline-none rounded-[4px] bg-[#A9968C] shadow-[2px_2px_6px_0px_#735C50_inset,_-1px_-1px_2px_0px_rgba(255,_255,_255,_0.25)_inset]" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="rsvp-allergy" className="font-lato font-bold text-[16px] leading-[16px]">
            Food allergies / Dietary restrictions
          </label>
          <input type="text" id="rsvp-allergy" className="px-3 py-2.5 text-[14px] leading-[16px] outline-none rounded-[4px] bg-[#A9968C] shadow-[2px_2px_6px_0px_#735C50_inset,_-1px_-1px_2px_0px_rgba(255,_255,_255,_0.25)_inset]" onChange={(e) => setAllergy(e.target.value)} />
        </div>
        <div className="flex flex-col flex-grow gap-3">
          <label htmlFor="rsvp-inquiries" className="font-lato font-bold text-[16px] leading-[16px]">
            Inquiries
          </label>
          <textarea id="rsvp-inquiries" className="resize-none px-3 py-2.5 h-full text-[14px] leading-[16px] outline-none rounded-[4px] bg-[#A9968C] shadow-[2px_2px_6px_0px_#735C50_inset,_-1px_-1px_2px_0px_rgba(255,_255,_255,_0.25)_inset]" onChange={(e) => setInquiry(e.target.value)} />
        </div>
      </div>
      <div className={`flex flex-col items-end justify-between w-1/3 ${success ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
        <img src="/images/stamp.png" alt="" width={202} />
        <div className="flex flex-col items-end">
          <p className="text-[#292929] font-playfair font-bold text-[16px] leading-[16px] tracking-[-0.16px] text-right mb-4">I gladly accept the invitation</p>
          <button type="button" className=" disabled:bg-[#514949] disabled:text-[#797878] bg-ohi-accent rounded-[4px] text-white font-bold text-[16px] leading-[16px] tracking-[-0.16px] py-2 w-full max-w-[155px]" disabled={sendEnabled === false || loading === true} onClick={sendEmail}>
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RSVPForm;
