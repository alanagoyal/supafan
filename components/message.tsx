import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";
import toast, { Toast, Toaster } from "react-hot-toast";
import React, { useState } from "react";
import { mutate } from "swr";

type Messages = Database["public"]["Tables"]["messages"]["Row"];

export default function Message() {
  const [message, setMessage] = useState<Messages["message_text"]>("");

  async function sendMail(message_text: string, gif_url: string) {
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message_text,
          gif_url,
        }),
      });
      const data = await response.json();
      console.log("Email sent:", data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  async function submitMessage(message: Messages["message_text"]) {
    // make api call to filter inapropriate messages
    const filter_response = await fetch("/api/filterMessages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message_text: message }),
    });

    const filter_result = await filter_response.json();

    if (filter_result.response) {
      toast.error("Sorry, that message isn't appropriate.");
      return;
    }

    // make api call to generate gif
    const tenor_response = await fetch("/api/searchGifs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message_text: message }),
    });

    const tenor_result = await tenor_response.json();
    const gif_url = tenor_result.response;

    // insert in db
    try {
      let { error } = await supabase
        .from("messages")
        .insert({ message_text: message, gif_url: gif_url });
      if (error) throw error;
      mutate("/api/display");
    } catch (error) {
      console.log(error);
    }

    // send message
    sendMail(message!, gif_url);
  }

  return (
    <div className="py-2 mx-10 max-width-5-xl">
      <Toaster />
      <div className="my-4 flex justify-center">
        <input
          autoComplete="off"
          id="message"
          type="text"
          className="w-full rounded-md bg-[#3b3b3b] border-gray-300 shadow-sm pb-2 px-3 my-4 focus:outline-none focus:ring-green-500 focus:border-green-500 text-base sm:text-sm"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setMessage("");
              toast.success(
                "Hooray! Hold tight while we submit your message for review."
              );
              submitMessage(message);
            }
          }}
          value={message!}
        />

        <button
          className="bg-[#2b825b] hover:bg-[#3dc688] text-white font-bold py-2 px-4 my-4 rounded-full ml-2"
          onClick={() => {
            setMessage("");
            toast.success(
              "Hooray! Hold tight while we submit your message for review."
            );
            submitMessage(message);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
