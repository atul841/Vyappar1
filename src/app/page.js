"use client"
import { useAuth } from "@/lib/auth";
import HomePage from "./_components/HomePage";
import Loading from "./_components/Loading";

export default function Home() {
  const { loading } = useAuth();

  if (loading) {
    return (
     <Loading/>
    );
  }

  return (
    <>
      <HomePage />
    </>
  );
}
