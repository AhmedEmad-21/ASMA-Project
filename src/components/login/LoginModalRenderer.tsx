"use client";
import Modal from "./Modal";
import { useLogin } from "../../context/LoginContext";

export default function LoginModalRenderer() {
  const { isLoginOpen, closeLogin } = useLogin();
  if (!isLoginOpen) return null;
  return <Modal isOpen={isLoginOpen} onClose={closeLogin} />;
}
