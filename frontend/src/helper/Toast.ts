import { toast } from "react-hot-toast";

export function successToast(text: string) {
  return toast.success(text, {
    duration: 2000,
    position: "top-center",
    style: {
      width: "100%", // This is fine if you want the toast to take up 50% width
      opacity: 0.9, // Slight transparency, if needed
      backdropFilter: "blur(8px)", // Blurred background effect
      padding: "8px", // Adds padding for a better layout
      borderRadius: "10px", // Optional: Rounds the corners
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
  });
}

export function promiseToast<T>(
  func: Promise<T>,
  loading: string,
  success: string,
  error: string
) {
  return toast.promise<T>(func, {
    loading,
    success,
    error,
  });
}
