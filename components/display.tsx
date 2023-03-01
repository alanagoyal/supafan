import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";
import { useState } from "react";

type Messages = Database["public"]["Tables"]["messages"]["Row"];

function displayMessages(messages: Messages[]) {
  return (
    <div className="flex justify-between items-center">
      {messages &&
        messages.map((message: any) => (
          <div key={message.id}>{message.message_text}</div>
        ))}
    </div>
  );
}

export async function getServerSideProps() {
  let { data, error, status } = await supabase
    .from("messages")
    .select()
    .eq("is_pc", true);

  if (data) {
    console.log({ data });
    return {
      props: {
        messages: data,
      },
    };
  }
}

export default displayMessages;
