"use client"
import CreateBounty from "@/components/CreateBounty";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-full w-full">
      <Navbar />
      <CreateBounty />
    </div>
  );
}
