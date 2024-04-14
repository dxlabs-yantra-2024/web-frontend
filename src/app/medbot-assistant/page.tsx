"use client";

import {
  CardWithSeparator,
  CardWithSeparatorTitleText,
} from "@/components/CardWithSeparator";
import { TextField } from "@/components/TextField";
import { ENV } from "@/constants/env";
import { useGetToken } from "@/hooks/useGetToken";
import useAskMedbot from "@/mutations/useAskMedbot";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { LuLoader2 } from "react-icons/lu";
import { MdSend } from "react-icons/md";
import { io } from "socket.io-client";

const SOCKET_EVENTS = {
  CONNECTION: "connect",
  DISCONNECT: "disconnect",
  GPT: "GPT",
  FOLLOW_UP: "FollowUp",
  SOURCES: "Sources",
};

const MedBot = () => {
  const { mutate: chatWithMedbot } = useAskMedbot();
  const userId = "661914e61392228313e6ba";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastMessageType, setlastMessageType] = useState("");
  const [sourcesResponse, setSourcesResponse] = useState([]);
  const [gptResponse, setGptResponse] = useState([]);
  const [followupResponse, setFollowupResponse] = useState([]);
  const { token } = useGetToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const startChat = () => {
    chatWithMedbot("What is dengue in india");
  };
  useEffect(() => {
    const DEV_SERVER_URL = ENV.SOCKET_URL;
    const socket = io(DEV_SERVER_URL, {
      query: { token },
    });
    socket.on("newMessage", (data) => {
      setlastMessageType("Query");
      setIsLoading(true);
      if (data) {
        setMessageHistory((prevMessages: any) => {
          const messageExists = prevMessages.some(
            (message: any) => message.id === data.data.id
          );
          if (!messageExists) {
            return [...prevMessages, data.data];
          }
          return prevMessages;
        });
      }
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    });

    socket.on("Sources", (data) => {
      setlastMessageType("Sources");
      setIsLoading(true);
      setSourcesResponse(data);
      setMessageHistory((prevMessages: any) => {
        return [...prevMessages, data];
      });

      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
      return () => {
        socket.disconnect();
      };
    });

    socket.on("GPT", (data) => {
      setlastMessageType("GPT");
      setIsLoading(true);
      setGptResponse(data);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
      return () => {
        socket.disconnect();
      };
    });

    socket.on("FollowUp", (data) => {
      setlastMessageType("FollowUp");
      setMessageHistory((prevMessages: any) => {
        return [...prevMessages, gptResponse];
      });
      setIsLoading(false);
      setFollowupResponse(data);
      setMessageHistory((prevMessages: any) => {
        return [...prevMessages, data];
      });
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
      return () => {
        socket.disconnect();
      };
    });

    return () => {
      socket.disconnect();
    };
  }, [
    token,
    lastMessageType,
    setIsLoading,
    setMessageHistory,
    userId,
    gptResponse,
  ]);

  const handleAskMedbot = (data: any) => {
    reset();
    setMessageHistory((prevMessages: any) => {
      return [
        ...prevMessages,
        {
          message: data.prompt,
          sender: "user",
        },
      ];
    });
    chatWithMedbot(data.prompt);
  };

  return (
    <div className="p-4 ">
      <div className="h-[75vh] flex-grow overflow-auto pr-8 ">
        <div className="flex flex-col gap-4 h-full ">
          {messageHistory?.map((message: any, index: number) => {
            return (
              <div key={index}>
                {message?.sender === "user" ? (
                  <div className="flex justify-end">
                    <div className="p-2 border border-black rounded-md max-w-[50%]">
                      {message.message}
                    </div>
                  </div>
                ) : (
                  <>
                    {message?.data?.type === "Sources" && (
                      <CardWithSeparator
                        titleComponent={
                          <CardWithSeparatorTitleText>
                            Sources
                          </CardWithSeparatorTitleText>
                        }
                      >
                        <div className="grid grid-cols-4 gap-4">
                          {message?.data?.content?.map((content: any) => {
                            return (
                              <a
                                href={content.link}
                                target="_blank"
                                className="flex flex-col gap-2 p-2 rounded-md h-[150px] justify-between border border-black bg-white"
                                key={content.title}
                              >
                                <h1 className="line-clamp-2 overflow-ellipsis">
                                  {content.title}
                                </h1>
                                <p className="break-all line-clamp-2 overflow-ellipsis">
                                  {content.link}
                                </p>
                              </a>
                            );
                          })}
                        </div>
                      </CardWithSeparator>
                    )}
                    {message?.data?.type === "GPT" && (
                      <CardWithSeparator
                        titleComponent={
                          <CardWithSeparatorTitleText>
                            MedBot Response
                          </CardWithSeparatorTitleText>
                        }
                      >
                        <p>{message?.data?.content}</p>
                      </CardWithSeparator>
                    )}
                    {message?.data?.type === "FollowUp" && (
                      <CardWithSeparator
                        titleComponent={
                          <CardWithSeparatorTitleText>
                            Follow Up Questions
                          </CardWithSeparatorTitleText>
                        }
                      >
                        <div className="flex flex-col gap-4">
                          {JSON.parse(message?.data?.content)?.[
                            "follow_up"
                          ]?.map((question: any) => (
                            <button
                              key={question}
                              onClick={() =>
                                handleAskMedbot({
                                  prompt: question,
                                })
                              }
                              className="p-2 border border-black rounded-md w-full text-left"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      </CardWithSeparator>
                    )}
                  </>
                )}
              </div>
            );
          })}
          {isLoading && (
            <div className="my-8 w-full flex items-center justify-center">
              <div className="animate-spin">
                <LuLoader2 size={48} className="text-primaryGreen" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="mt-10" />
        </div>

        <div className="relative w-full ">
          <div
            className="fixed bottom-4 p-2  bg-white flex items-stretch rounded-md"
            style={{
              width: "calc(100% - 280px)",
            }}
          >
            <form className="flex gap-4  items-stretch w-full">
              <div className="flex-grow">
                <TextField
                  name="prompt"
                  placeholder="Ask MedBot"
                  register={register}
                  inputClassName="w-full"
                />
              </div>
              <button onClick={handleSubmit(handleAskMedbot)}>
                <MdSend />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedBot;
