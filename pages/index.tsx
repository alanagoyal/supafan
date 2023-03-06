import { supabase } from "./../lib/supabaseClient";
import { Database } from "@/types/supabase";
import Message from "@/components/message";
import Display from "@/components/display";
import { FrigadeChecklist } from "@frigade/react";

function Page({
  messages,
}: {
  messages: Database["public"]["Tables"]["messages"]["Row"];
}) {
  return (
    <div className="absolute w-full h-screen">
      <div className="absolute w-[600px] h-[400px] top-[-200px] left-[-200px] bg-green-400 rounded-full blur-[100px] opacity-20 dark:opacity-10" />
      <div className="absolute w-[800px] h-[500px] bottom-[-200px] right-0 bg-green-200 rounded-full blur-[100px] opacity-20 dark:opacity-10" />
      <Message />
      <Display />
      <FrigadeChecklist
        flowId="flow_laJhda4sgJCdsCy6"
        title={"Get Started"}
        subtitle={"Complete the following steps to get started"}
        primaryColor={"#3661E1"}
      />
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
