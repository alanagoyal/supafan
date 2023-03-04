import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";
import toast, { Toast, Toaster } from "react-hot-toast";
import { SearchForm } from "@/components/gif-search";
import { TenorGif } from "tenorjs";
import React, { useState } from "react";
import { searchGifs } from "../lib/tenorClient";
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
      toast.error("Sorry, that message isn't appropriate. Please be nice!");
      console.log("bad result");
    } else {
      try {
        let { error } = await supabase
          .from("messages")
          .insert({ message_text: message });
        if (error) throw error;
        console.log("message inserted into db");
        mutate("/api/display");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="py-5 mx-10 max-width-5-xl">
      <Toaster />
      <h1 className="text-4xl font-bold text-center my-6">⚡️ Supafan ⚡️</h1>
      <h2 className="text-1xl text-center my-6">
        What do you love about Supabase?
      </h2>
      <div>
        {/*         <SearchForm onSearch={handleSearch} />
        {gifs.map((gif) => (
          <img key={gif.id} src={gif.media[0].gif.url} alt={gif.title} />
        ))} */}
      </div>
      <div className="my-4">
        <input
          autoComplete="off"
          id="message"
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 mt-1 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setMessage("");
              toast.success("Hooray! Your message has been submitted.");
              submitMessage(message);
            }
          }}
          value={message!}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-green-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            setMessage("");
            toast.success("Hooray! Your message has been submitted.");
            submitMessage(message);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
