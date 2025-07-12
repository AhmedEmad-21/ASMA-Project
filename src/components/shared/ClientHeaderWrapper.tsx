"use client";
import Header from "./Header";
import { useLogin } from "../../context/LoginContext";

export default function ClientHeaderWrapper() {
  const { openLogin } = useLogin();

  return <Header openModal={openLogin} showLogin={openLogin} />;
}
