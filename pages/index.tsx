import { supabase } from "./../lib/supabaseClient";
import { Database } from "@/types/supabase";

function Page({
  messages,
}: {
  messages: Database["public"]["Tables"]["messages"]["Row"];
}) {
  return (
    <ul>
      {messages.map((message) => (
        <li key={message.id}>{message.message_text}</li>
      ))}
    </ul>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("messages").select();

  if (data) {
    return {
      props: {
        messages: data.map((message) => ({
          id: message.id,
          message_text: message.message_text,
        })),
      },
    };
  }
}

export default Page;
