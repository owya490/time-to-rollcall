"use client";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

export default function LandingPage() {
  return (
    <main>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <p>hi</p>
      <Loader show />
      <button onClick={() => toast.success("hello toast")}>
        Display Toast
      </button>
    </main>
  );
}
