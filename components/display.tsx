import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/supabase";
import React, { useState } from "react";
import useSWR from "swr";
import { faker } from "@faker-js/faker";
import { Gallery } from "./quote-card";

type Quote = {
  name: string;
  title: string;
  avatar: string;
  quote: string;
  gif_url?: string;
};

type Messages = Database["public"]["Tables"]["messages"]["Row"];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Display() {
  const { data } = useSWR("/api/display", fetcher);

  const quotes: Quote[] =
    data?.messages?.map((message: Messages) => ({
      name: faker.name.fullName(),
      title: faker.company.name(),
      avatar: faker.image.avatar(),
      quote: message.message_text,
      gif_url: message.gif_url,
    })) ?? [];

  return (
    <div className="px-4">
      <Gallery quotes={quotes} />
    </div>
  );
}
