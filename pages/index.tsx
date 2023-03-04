import { supabase } from "./../lib/supabaseClient";
import { Database } from "@/types/supabase";
import Message from "@/components/message";
import { Gallery } from "@/components/quote-card";
import Display from "@/components/display";

function Page({
  messages,
}: {
  messages: Database["public"]["Tables"]["messages"]["Row"];
}) {
  console.log({ messages });
  return (
    <div className="absolute w-full h-screen">
      <div className="absolute w-[600px] h-[400px] top-[-200px] left-[-200px] bg-green-400 rounded-full blur-[100px] opacity-20 dark:opacity-10" />
      <div className="absolute w-[800px] h-[500px] bottom-[-200px] right-0 bg-green-600 rounded-full blur-[100px] opacity-20 dark:opacity-10" />
      <Message />
      <Display />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    let { data, error, status } = await supabase.from("messages").select();
    return {
      props: {
        messages: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default Page;
