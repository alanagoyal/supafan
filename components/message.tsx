import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";
import { useState } from "react";
import toast, { Toast, Toaster } from "react-hot-toast";

type Messages = Database["public"]["Tables"]["messages"]["Row"];

export default function Message() {
  const [message, setMessage] = useState<Messages["message_text"]>(null);

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
        let { error } = await supabase.from("messages").insert(message);
        if (error) throw error;
        toast.success("Hooray! Your message has been submitted.");
      } catch (error) {
        toast.error("Error sending message");
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
      <div className="my-4">
        <input
          id="message"
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 mt-1 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submitMessage(message);
              setMessage("");
            }
          }}
          value={message!}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-green-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => {
            submitMessage(message);
            setMessage("");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
