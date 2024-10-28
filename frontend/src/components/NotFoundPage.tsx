"use client";
import { Path } from "@/helper/Path";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  const handleBack = () => {
    if (
      document.referrer &&
      document.referrer.includes(window.location.origin)
    ) {
      router.back();
    } else {
      router.push(Path.Group);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl">Page Not Found</h1>
      <button className="text-lg underline" onClick={handleBack}>
        Go back
      </button>
    </div>
  );
}
