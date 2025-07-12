"use client";
import ClientHeaderWrapper from "../shared/ClientHeaderWrapper";
import Footer from "../shared/Footer";
import Modal from "../login/Modal";
import { useLogin } from "../../context/LoginContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isLoginOpen, closeLogin } = useLogin();

  return (
    <>
      <ClientHeaderWrapper />
      <main className="min-h-screen">{children}</main>
      <Footer />
      {isLoginOpen && <Modal isOpen={isLoginOpen} onClose={closeLogin} />}
    </>
  );
}
