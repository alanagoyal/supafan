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
  const [gifs, setGifs] = useState<TenorGif[]>([]);

  async function submitMessage(message: Messages["message_text"]) {
    const response = await fetch("/api/filterMessages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message_text: message }),
    });

    const result = await response.json();
    console.log(result);

    if (result.response) {
      toast.error("Sorry, that message isn't appropriate.");
      return;
    }
    const tenor_url = new URL("https://g.tenor.com/v1/random");
    tenor_url.searchParams.append("q", message);
    tenor_url.searchParams.append("key", "LIVDSRZULELA");

    const tenor_response = await fetch(tenor_url.href);

    const tenor_data = await tenor_response.json();

    let gif_url = null;

    if (tenor_data.results) {
      gif_url = tenor_data.results[0].media[0].gif.url;
    }

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
    <div className="py-5 mx-10 max-width-5-xl">
      <Toaster />
      <h1 className="text-4xl font-bold text-center my-6">⚡️ Supafan ⚡️</h1>
      <h2 className="text-1xl text-center my-6">
        What do you love about Supabase?
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
          className="bg-cyan-700 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full ml-2"
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
