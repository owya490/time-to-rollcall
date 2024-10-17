import { toast } from "react-hot-toast";

export function successToast(text: string) {
  return toast.success(text, {
    duration: 2000,
    position: "top-center",
    style: {
      width: "100%",
      opacity: 0.9,
      backdropFilter: "blur(8px)",
      padding: "8px",
      borderRadius: "10px",
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
  return toast.promise<T>(
    func,
    {
      loading,
      success,
      error,
    },
    {
      style: {
        width: "100%",
        opacity: 0.9,
        backdropFilter: "blur(8px)",
        padding: "8px",
        borderRadius: "10px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      },
    }
  );
}
