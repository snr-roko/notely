import { Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";
import React from 'react'
import type { LoaderProps } from "@/interfaces";

const Loading: React.FC<LoaderProps> = ({text}) => {
  return (
    <Button variant={"ghost"} className="w-full text-center" disabled>
      <Loader2Icon className="animate-spin" />
      <p>{text}</p>
    </ Button>
  )
}

export default Loading