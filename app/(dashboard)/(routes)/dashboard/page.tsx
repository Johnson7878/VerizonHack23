"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { useForm } from "react-hook-form";
import { MessageSquare } from "lucide-react";
import { formSchema } from "./constants";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OpenAI from 'openai';
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";


const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<OpenAI.Chat.CreateChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        prompt: ""
      }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      const userMessage: OpenAI.Chat.CreateChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  
  return (
    <div className="bg-black">
      <Heading 
        title="Conversation"
        description="Verizon knowledge-trained conversational model for service and product assistance."
        icon={MessageSquare}
        iconColor="text-red-600"
        bgColor="bg-red-600/10"
      />
      <div className="px-4 lg:px-8 bg-white">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2">
              <FormField name="prompt" render={({field}) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input 
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="What services does Verizon offer?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>)}/>
                <Button className="col-span-12 lg:col-span-2 text-white bg-red-600 w-full" disabled={isLoading}>
                  Generate
                </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty label="No converstation started."/>
          )}
                <div className="flex flex-col-reverse gap-y-4">
                  {messages.map((message) => (
                    <div 
                    key={message.content}
                    className={cn(
                      "p-8 w-full flex items-start gap-x-8 rounded-lg",
                      message.role === "user" ? "bg-white border border-black/10" : "bg-muted"
                      )}
                    >
                      {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                      <p className="text-sm">
                      {message.content}
                      </p>
                    </div>
                  ))}
                </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationPage;