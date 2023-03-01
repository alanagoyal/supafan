import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";

type Messages = Database["public"]["Tables"]["messages"]["Row"];

export default function Display(messages: any) {
  return (
    <div>
      {/*       {" "}
      {messages.map((message: any) => (
        <div key={message.id}>{message.message_text}</div>
      ))} */}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    let { data, error, status } = await supabase.from("messages").select();

    if (data) {
      for (const message of data as any) {
        const response = await fetch("/api/filterMessages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message_text: message.message_text }),
        });

        const result = await response.json();
        console.log(result);

        if (result.response) {
          console.log("bad result");
          const { error } = await supabase
            .from("messages")
            .update({ is_pc: false })
            .eq("id", message.id);
          if (error) throw error;
        }
      }
    }
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }

  try {
    let { data, error, status } = await supabase.from("messages").select();
    if (data) {
      return {
        props: {
          messages: data,
        },
      };
    }
  } catch (error) {
    console.log(error);
  }
}
