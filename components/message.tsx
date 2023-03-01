import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";
import { useState } from "react";
import toast, { Toast, Toaster } from "react-hot-toast";

type Messages = Database["public"]["Tables"]["messages"]["Row"];

export default function Message() {
  const [message, setMessage] = useState<Messages["message_text"]>(null);

  async function submitMessage(message: Messages["message_text"]) {
    try {
      let { error } = await supabase.from("messags").insert(message);
      toast("Hooray! Your message has been submitted.");
      if (error) throw error;
    } catch (error) {
      toast("Error sending message");
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
      <div className="my-4">
        <input
          id="message"
          type="text"
          className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 mt-1 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => submitMessage(message)}
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
}
