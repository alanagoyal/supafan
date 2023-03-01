import { supabase } from "./../lib/supabaseClient";
import { Database } from "@/types/supabase";
import Message from "@/components/message";
import Display from "@/components/display";

function Page({
  messages,
}: {
  messages: Database["public"]["Tables"]["messages"]["Row"];
}) {
  return (
    <div className="absolute w-full h-screen">
      <div className="absolute w-[600px] h-[400px] top-[-200px] left-[-200px] bg-green-400 rounded-full blur-[100px] opacity-20 dark:opacity-10" />
      <div className="absolute w-[800px] h-[500px] bottom-[-200px] right-0 bg-green-600 rounded-full blur-[100px] opacity-20 dark:opacity-10" />
      <Message />
    </div>
  );
}

export default Page;
