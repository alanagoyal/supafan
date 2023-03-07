import { supabase } from "./../lib/supabaseClient";
import { Database } from "@/types/supabase";
import Message from "@/components/message";
import Display from "@/components/display";
import { FrigadeChecklist } from "@frigade/react";
import Footer from "@/components/footer";
import Head from "next/head";
import Github from "@/components/github";

function Page({
  messages,
}: {
  messages: Database["public"]["Tables"]["messages"]["Row"];
}) {
  return (
    <div>
      <Head>
        <title>Supafan</title>
      </Head>
      <h1 className="text-4xl text-gray-100 font-bold text-center pt-10">
        Supafan
      </h1>

      <h2 className="text-1xl text-gray-100 text-center pt-4">
        Tell us what you love about Supabase 👇🏼
      </h2>
      <Message />
      <Display />
      <FrigadeChecklist
        flowId="flow_laJhda4sgJCdsCy6"
        title={"Get Started"}
        subtitle={"Complete the following steps to get started"}
        primaryColor={"#3661E1"}
      />
      <Footer />
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
