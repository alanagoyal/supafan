import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";
import toast, { Toast, Toaster } from "react-hot-toast";
import React, { useState } from "react";
import { mutate } from "swr";

type Gif = {
  id: string;
  url: string;
  preview: string;
};

type Messages = Database["public"]["Tables"]["messages"]["Row"];

export default function Message() {
  const [message, setMessage] = useState<Messages["message_text"]>(null);

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

    try {
      let { error } = await supabase
        .from("messages")
        .insert({ message_text: message, gif_url: gif_url });
      if (error) throw error;
      console.log("message inserted into db");
      mutate("/api/display");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-[#1c1c1c] py-5 mx-10 max-width-5-xl">
      <Toaster />
      <h1 className="text-4xl font-bold text-center my-6">Supafan</h1>
      <h2 className="text-1xl text-center my-6">
        Tell us what you love about Supabase 👇🏼
      </h2>
      <div className="my-4 flex justify-center">
        <input
          autoComplete="off"
          id="message"
          type="text"
          className="block w-500 rounded-md border-gray-300 shadow-sm py-2 px-3 mt-1 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
          className="bg-[#2b825b] hover:bg-[#3dc688] text-white font-bold py-2 px-4 rounded-full ml-2"
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
