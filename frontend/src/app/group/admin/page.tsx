"use client";
import AuthCheck from "@/components/AuthCheck";
import Topbar from "@/components/Topbar";
import { Path } from "@/helper/Path";
import { UserContext } from "@/lib/context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function GroupAdmin() {
  const user = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user?.role !== "admin") {
        router.push(Path.Group);
      }
    }
    // eslint-disable-next-line
  }, [user]);

  // const addMembers = async () => {
  //   // SOW
  //   console.log("SOW");
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "0cSYfuExa3dpxHQ8SQi5RBWbwIz2"
  //     ),
  //     {
  //       email: "jacquie.liu@sowaustralia.com",
  //       name: "Jacquie Liu",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "0wyj3pxC3vcRy9Z3atMc3cmz5Hw2"
  //     ),
  //     {
  //       email: "timothy.yatco@sowaustralia.com",
  //       name: "Timothy Yatco",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "5", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "1deVspvZrLXZCnLz6Afb0CTAAuo2"
  //     ),
  //     {
  //       email: "erlina.yang@sowaustralia.com",
  //       name: "Erlina Yang",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "2bFZALlQZ8aIXKMR4YVMAnMIM8v1"
  //     ),
  //     {
  //       email: "nathan.shi@sowaustralia.com",
  //       name: "Nathan Shi",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "4AGFO0S2A9cxBw91phnPj92FbP93"
  //     ),
  //     {
  //       email: "aaron.valdez@sowaustralia.com",
  //       name: "Aaron Valdez",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "4XL8M1nAojU6eV5xsQrQrr3TBXz1"
  //     ),
  //     {
  //       email: "ed.more@sowaustralia.com",
  //       name: "Ed More",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "4ZRWrA5HumOhIBk6xed69cMzENF3"
  //     ),
  //     {
  //       email: "nathania.adikarta@sowaustralia.com",
  //       name: "Nathania Adikarta",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "58kJ0cTY3JWvfjoOph6L1gJcLxG2"
  //     ),
  //     {
  //       email: "ian.chung@sowaustralia.com",
  //       name: "Ian Chung",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "6m12KB0JnVQupaxsXsRMdpZnBmN2"
  //     ),
  //     {
  //       email: "carissa.wong@sowaustralia.com",
  //       name: "Carissa Wong",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "8lfUbYE0JOfJ37kkyQJxCt6kegQ2"
  //     ),
  //     {
  //       email: "josh.kim@sowaustralia.com",
  //       name: "Josh Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "7", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "AHJeiF9zy3eOciUArotV8LdkPoo2"
  //     ),
  //     {
  //       email: "monica.park@sowaustralia.com",
  //       name: "Monica Park",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "BhbtRkkvF4a2nPMmmTGOpvhjo6x1"
  //     ),
  //     {
  //       email: "kivin.park@sowaustralia.com",
  //       name: "Kivin Park",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "GnidM9Pz9PRgD7sbT6frJ4MVG6m2"
  //     ),
  //     {
  //       email: "rachel.lee@sowaustralia.com",
  //       name: "Rachel Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "IF3qEpUyHCdyOrdtbkfLM4IVwsI2"
  //     ),
  //     {
  //       email: "andrew.lee@sowaustralia.com",
  //       name: "Andrew Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "JLIUp4gZTGVFRMTK0fBwcpyPtRp1"
  //     ),
  //     {
  //       email: "sowon.jun@sowaustralia.com",
  //       name: "Sowon Jun",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "MC6yGrOgN1RTLp5ikl1RUDYqo382"
  //     ),
  //     {
  //       email: "joy.shin@sowaustralia.com",
  //       name: "Joy Shin",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "OD0GmgnNRiSm813GNIHaMXCAioC2"
  //     ),
  //     {
  //       email: "louise.park@sowaustralia.com",
  //       name: "Louise Park",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "Ojmar4CYcaPMYzb7ZiTjuQ6P0Lq1"
  //     ),
  //     {
  //       email: "sarah.shin@sowaustralia.com",
  //       name: "Sarah Shin",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "Q9zmKA4VQsUv3hqqIHdCDyg9pgB2"
  //     ),
  //     {
  //       email: "david.song@sowaustralia.com",
  //       name: "David Song",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "5", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "Rz6cMZVjMPWqiQUGQzJ1XrqmMlp1"
  //     ),
  //     {
  //       email: "brandon.teng@sowaustralia.com",
  //       name: "Brandon Teng",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "Sl954L1pwGe3SsYUZT2sislWt3s2"
  //     ),
  //     {
  //       email: "ashley.kim2@sowaustralia.com",
  //       name: "Ashley Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "TOfcW43oTbel2FTEsaf4EY8FXlp1"
  //     ),
  //     {
  //       email: "yebin.lee@sowaustralia.com",
  //       name: "Yebin Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "TnVzFVOHjyezXTkO0RUh3mkrZQD3"
  //     ),
  //     {
  //       email: "benjamin.kim@sowaustralia.com",
  //       name: "Benjamin Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "W04jiqxTt6dkAvhA4t1hVw6oRce2"
  //     ),
  //     {
  //       email: "joshua.lee@sowaustralia.com",
  //       name: "Joshua Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "WQgrEaK4AYT9yTGr2WrL8aKqx1j1"
  //     ),
  //     {
  //       email: "rebecca.lee@sowaustralia.com",
  //       name: "Rebecca Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "ZJC6gPjOI7Xc3CCHLEEE9mtiWWy2"
  //     ),
  //     {
  //       email: "april.jiang@sowaustralia.com",
  //       name: "April Jiang",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "aFlYWlIEWeWXJkY6e5lDwtX3M4i1"
  //     ),
  //     {
  //       email: "james.zhao@sowaustralia.com",
  //       name: "James Zhao",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "aKA5nxyYABWpWmHFSumubT4Ooos1"
  //     ),
  //     {
  //       email: "chloe.moon@sowaustralia.com",
  //       name: "Chloe Moon",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "b1TNNDVN2MR5bxY7IrYUq7a2CCK2"
  //     ),
  //     {
  //       email: "esther.ahn@sowaustralia.com",
  //       name: "Esther Ahn",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "9" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "bReJKkxsZZdgs6zHZJrt69Aevhz2"
  //     ),
  //     {
  //       email: "sijin.yang@sowaustralia.com",
  //       name: "Sijin Yang",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "Director" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "cLwJdqf7O9aGLMg3CxSUiAkeOqb2"
  //     ),
  //     {
  //       email: "wilfred.teh@sowaustralia.com",
  //       name: "Wilfred Teh",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "cY6WeiyHWBedv0J8BCt5xHQQJ0A2"
  //     ),
  //     {
  //       email: "daniel.lee@sowaustralia.com",
  //       name: "Daniel Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "fKVUYvAtdQhdXdnZ19knoouwlOx1"
  //     ),
  //     {
  //       email: "michelle.chen@sowaustralia.com",
  //       name: "Michelle Chen",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "gRvtET9OCTdVbhGBhl0g3OHWhpk1"
  //     ),
  //     {
  //       email: "christina.lee@sowaustralia.com",
  //       name: "Christina Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "ggmYMlVjEnSfzKTvvzMOY0kdwrH3"
  //     ),
  //     {
  //       email: "sam.kim@sowaustralia.com",
  //       name: "Sam Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "h2aoA1XkPjRBbqAh47ndHgbhRHR2"
  //     ),
  //     {
  //       email: "edward.kim@sowaustralia.com",
  //       name: "Edward Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "hndxI4TzpsUCWQvHpfyW3X39pCo1"
  //     ),
  //     {
  //       email: "angela.kang@sowaustralia.com",
  //       name: "Angela Kang",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "iyGgzJCc46SczXTbENmoeD595rX2"
  //     ),
  //     {
  //       email: "jisue.shim@sowaustralia.com",
  //       name: "Jisue Shim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "jnotpNRVKOW6pfoEgr3fwKSvpaV2"
  //     ),
  //     {
  //       email: "isac.kim@sowaustralia.com",
  //       name: "Isac Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "9" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "k7RvJ7iZ4UW3FhtSJQ6VtDqpVfE3"
  //     ),
  //     {
  //       email: "irene.chen@sowaustralia.com",
  //       name: "Irene Chen",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "kaZVKTJyg4b0joLQlFIHe06CSKK2"
  //     ),
  //     {
  //       email: "joseph.yu@sowaustralia.com",
  //       name: "Joseph Yu",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "lqYBTpWtPwV1kQLeOePKuFyloxW2"
  //     ),
  //     {
  //       email: "justin.hung@sowaustralia.com",
  //       name: "Justin Hung",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "o9ixc8N6hVVQUEntTz1AAdC36e22"
  //     ),
  //     {
  //       email: "natalie.kwok@sowaustralia.com",
  //       name: "Natalie Kwok",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "praSTUn43qWCEvDDKlgj4cJvmZV2"
  //     ),
  //     {
  //       email: "annika.chong@sowaustralia.com",
  //       name: "Annika Chong",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "qaPmJh5nfUUlDcz3UX8ZS56f0Hw2"
  //     ),
  //     {
  //       email: "daniel.kim@sowaustralia.com",
  //       name: "Daniel Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "s11eFLnX0ae1UyQPjqN5KMJa5DE2"
  //     ),
  //     {
  //       email: "joanne.kim@sowaustralia.com",
  //       name: "Joanne Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "tdnWhv5pUmYo5UYAyaTYFk4NyQo2"
  //     ),
  //     {
  //       email: "kate.ro@sowaustralia.com",
  //       name: "Kate Ro",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "uULP1AY9HkSz5d9nPAMAXyw0riA3"
  //     ),
  //     {
  //       email: "krishna.cereno@sowaustralia.com",
  //       name: "Krishna Cereno",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "5", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "vOyvsZD7UoT4z2nthdBxM6ArdH92"
  //     ),
  //     {
  //       email: "irene.lee@sowaustralia.com",
  //       name: "Irene Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "5", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "wTudP68iBfNjLqNyaHADTOYZWWc2"
  //     ),
  //     {
  //       email: "faith.teo@sowaustralia.com",
  //       name: "Faith Teo",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "ydMmaGu87XSMtQdDIHwXGwvz4Uh1"
  //     ),
  //     {
  //       email: "joshua.quek@sowaustralia.com",
  //       name: "Joshua Quek",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2024",
  //       "members",
  //       "ywRk5Lgx1zOqAK2qdaYp7HAFOBw2"
  //     ),
  //     {
  //       email: "yeonwoo.kim@sowaustralia.com",
  //       name: "Yeonwoo Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );

  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "0cSYfuExa3dpxHQ8SQi5RBWbwIz2"
  //     ),
  //     {
  //       email: "jacquie.liu@sowaustralia.com",
  //       name: "Jacquie Liu",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "0wyj3pxC3vcRy9Z3atMc3cmz5Hw2"
  //     ),
  //     {
  //       email: "timothy.yatco@sowaustralia.com",
  //       name: "Timothy Yatco",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "5", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "1deVspvZrLXZCnLz6Afb0CTAAuo2"
  //     ),
  //     {
  //       email: "erlina.yang@sowaustralia.com",
  //       name: "Erlina Yang",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "2bFZALlQZ8aIXKMR4YVMAnMIM8v1"
  //     ),
  //     {
  //       email: "nathan.shi@sowaustralia.com",
  //       name: "Nathan Shi",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "4AGFO0S2A9cxBw91phnPj92FbP93"
  //     ),
  //     {
  //       email: "aaron.valdez@sowaustralia.com",
  //       name: "Aaron Valdez",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "4XL8M1nAojU6eV5xsQrQrr3TBXz1"
  //     ),
  //     {
  //       email: "ed.more@sowaustralia.com",
  //       name: "Ed More",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "4ZRWrA5HumOhIBk6xed69cMzENF3"
  //     ),
  //     {
  //       email: "nathania.adikarta@sowaustralia.com",
  //       name: "Nathania Adikarta",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "58kJ0cTY3JWvfjoOph6L1gJcLxG2"
  //     ),
  //     {
  //       email: "ian.chung@sowaustralia.com",
  //       name: "Ian Chung",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "6m12KB0JnVQupaxsXsRMdpZnBmN2"
  //     ),
  //     {
  //       email: "carissa.wong@sowaustralia.com",
  //       name: "Carissa Wong",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "8lfUbYE0JOfJ37kkyQJxCt6kegQ2"
  //     ),
  //     {
  //       email: "josh.kim@sowaustralia.com",
  //       name: "Josh Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "7", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "AHJeiF9zy3eOciUArotV8LdkPoo2"
  //     ),
  //     {
  //       email: "monica.park@sowaustralia.com",
  //       name: "Monica Park",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "BhbtRkkvF4a2nPMmmTGOpvhjo6x1"
  //     ),
  //     {
  //       email: "kivin.park@sowaustralia.com",
  //       name: "Kivin Park",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "GnidM9Pz9PRgD7sbT6frJ4MVG6m2"
  //     ),
  //     {
  //       email: "rachel.lee@sowaustralia.com",
  //       name: "Rachel Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "IF3qEpUyHCdyOrdtbkfLM4IVwsI2"
  //     ),
  //     {
  //       email: "andrew.lee@sowaustralia.com",
  //       name: "Andrew Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "JLIUp4gZTGVFRMTK0fBwcpyPtRp1"
  //     ),
  //     {
  //       email: "sowon.jun@sowaustralia.com",
  //       name: "Sowon Jun",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "MC6yGrOgN1RTLp5ikl1RUDYqo382"
  //     ),
  //     {
  //       email: "joy.shin@sowaustralia.com",
  //       name: "Joy Shin",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "OD0GmgnNRiSm813GNIHaMXCAioC2"
  //     ),
  //     {
  //       email: "louise.park@sowaustralia.com",
  //       name: "Louise Park",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "Ojmar4CYcaPMYzb7ZiTjuQ6P0Lq1"
  //     ),
  //     {
  //       email: "sarah.shin@sowaustralia.com",
  //       name: "Sarah Shin",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "Q9zmKA4VQsUv3hqqIHdCDyg9pgB2"
  //     ),
  //     {
  //       email: "david.song@sowaustralia.com",
  //       name: "David Song",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "5", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "Rz6cMZVjMPWqiQUGQzJ1XrqmMlp1"
  //     ),
  //     {
  //       email: "brandon.teng@sowaustralia.com",
  //       name: "Brandon Teng",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "Sl954L1pwGe3SsYUZT2sislWt3s2"
  //     ),
  //     {
  //       email: "ashley.kim2@sowaustralia.com",
  //       name: "Ashley Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "TOfcW43oTbel2FTEsaf4EY8FXlp1"
  //     ),
  //     {
  //       email: "yebin.lee@sowaustralia.com",
  //       name: "Yebin Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "TnVzFVOHjyezXTkO0RUh3mkrZQD3"
  //     ),
  //     {
  //       email: "benjamin.kim@sowaustralia.com",
  //       name: "Benjamin Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "W04jiqxTt6dkAvhA4t1hVw6oRce2"
  //     ),
  //     {
  //       email: "joshua.lee@sowaustralia.com",
  //       name: "Joshua Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "WQgrEaK4AYT9yTGr2WrL8aKqx1j1"
  //     ),
  //     {
  //       email: "rebecca.lee@sowaustralia.com",
  //       name: "Rebecca Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "ZJC6gPjOI7Xc3CCHLEEE9mtiWWy2"
  //     ),
  //     {
  //       email: "april.jiang@sowaustralia.com",
  //       name: "April Jiang",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "aFlYWlIEWeWXJkY6e5lDwtX3M4i1"
  //     ),
  //     {
  //       email: "james.zhao@sowaustralia.com",
  //       name: "James Zhao",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "aKA5nxyYABWpWmHFSumubT4Ooos1"
  //     ),
  //     {
  //       email: "chloe.moon@sowaustralia.com",
  //       name: "Chloe Moon",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "b1TNNDVN2MR5bxY7IrYUq7a2CCK2"
  //     ),
  //     {
  //       email: "esther.ahn@sowaustralia.com",
  //       name: "Esther Ahn",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "9" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "bReJKkxsZZdgs6zHZJrt69Aevhz2"
  //     ),
  //     {
  //       email: "sijin.yang@sowaustralia.com",
  //       name: "Sijin Yang",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "Director" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "cLwJdqf7O9aGLMg3CxSUiAkeOqb2"
  //     ),
  //     {
  //       email: "wilfred.teh@sowaustralia.com",
  //       name: "Wilfred Teh",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "cY6WeiyHWBedv0J8BCt5xHQQJ0A2"
  //     ),
  //     {
  //       email: "daniel.lee@sowaustralia.com",
  //       name: "Daniel Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "fKVUYvAtdQhdXdnZ19knoouwlOx1"
  //     ),
  //     {
  //       email: "michelle.chen@sowaustralia.com",
  //       name: "Michelle Chen",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "gRvtET9OCTdVbhGBhl0g3OHWhpk1"
  //     ),
  //     {
  //       email: "christina.lee@sowaustralia.com",
  //       name: "Christina Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "ggmYMlVjEnSfzKTvvzMOY0kdwrH3"
  //     ),
  //     {
  //       email: "sam.kim@sowaustralia.com",
  //       name: "Sam Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "h2aoA1XkPjRBbqAh47ndHgbhRHR2"
  //     ),
  //     {
  //       email: "edward.kim@sowaustralia.com",
  //       name: "Edward Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "hndxI4TzpsUCWQvHpfyW3X39pCo1"
  //     ),
  //     {
  //       email: "angela.kang@sowaustralia.com",
  //       name: "Angela Kang",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "iyGgzJCc46SczXTbENmoeD595rX2"
  //     ),
  //     {
  //       email: "jisue.shim@sowaustralia.com",
  //       name: "Jisue Shim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "jnotpNRVKOW6pfoEgr3fwKSvpaV2"
  //     ),
  //     {
  //       email: "isac.kim@sowaustralia.com",
  //       name: "Isac Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "9" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "k7RvJ7iZ4UW3FhtSJQ6VtDqpVfE3"
  //     ),
  //     {
  //       email: "irene.chen@sowaustralia.com",
  //       name: "Irene Chen",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "kaZVKTJyg4b0joLQlFIHe06CSKK2"
  //     ),
  //     {
  //       email: "joseph.yu@sowaustralia.com",
  //       name: "Joseph Yu",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "lqYBTpWtPwV1kQLeOePKuFyloxW2"
  //     ),
  //     {
  //       email: "justin.hung@sowaustralia.com",
  //       name: "Justin Hung",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "o9ixc8N6hVVQUEntTz1AAdC36e22"
  //     ),
  //     {
  //       email: "natalie.kwok@sowaustralia.com",
  //       name: "Natalie Kwok",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "praSTUn43qWCEvDDKlgj4cJvmZV2"
  //     ),
  //     {
  //       email: "annika.chong@sowaustralia.com",
  //       name: "Annika Chong",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "qaPmJh5nfUUlDcz3UX8ZS56f0Hw2"
  //     ),
  //     {
  //       email: "daniel.kim@sowaustralia.com",
  //       name: "Daniel Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "s11eFLnX0ae1UyQPjqN5KMJa5DE2"
  //     ),
  //     {
  //       email: "joanne.kim@sowaustralia.com",
  //       name: "Joanne Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "tdnWhv5pUmYo5UYAyaTYFk4NyQo2"
  //     ),
  //     {
  //       email: "kate.ro@sowaustralia.com",
  //       name: "Kate Ro",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "uULP1AY9HkSz5d9nPAMAXyw0riA3"
  //     ),
  //     {
  //       email: "krishna.cereno@sowaustralia.com",
  //       name: "Krishna Cereno",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "5", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "vOyvsZD7UoT4z2nthdBxM6ArdH92"
  //     ),
  //     {
  //       email: "irene.lee@sowaustralia.com",
  //       name: "Irene Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "5", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "wTudP68iBfNjLqNyaHADTOYZWWc2"
  //     ),
  //     {
  //       email: "faith.teo@sowaustralia.com",
  //       name: "Faith Teo",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "8" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "ydMmaGu87XSMtQdDIHwXGwvz4Uh1"
  //     ),
  //     {
  //       email: "joshua.quek@sowaustralia.com",
  //       name: "Joshua Quek",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "members",
  //       "2025",
  //       "members",
  //       "ywRk5Lgx1zOqAK2qdaYp7HAFOBw2"
  //     ),
  //     {
  //       email: "yeonwoo.kim@sowaustralia.com",
  //       name: "Yeonwoo Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );

  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "T4qzZ5X3pGqJgJ8CMOtk",
  //       "metadata",
  //       "wOoTm2Vtr1geLVZMh0Kl"
  //     ),
  //     {
  //       key: "campus",
  //       values: {
  //         "1": "University of New South Wales",
  //         "2": "Macquarie University",
  //         "3": "University of Sydney",
  //         "4": "University of Technology, Sydney",
  //       },
  //     }
  //   );

  //   // UNSW
  //   console.log("UNSW");
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "ccSgQTXvLRnin0OjwvRM",
  //       "members",
  //       "2025",
  //       "members",
  //       "1deVspvZrLXZCnLz6Afb0CTAAuo2"
  //     ),
  //     {
  //       email: "erlina.yang@sowaustralia.com",
  //       name: "Erlina Yang",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "ccSgQTXvLRnin0OjwvRM",
  //       "members",
  //       "2025",
  //       "members",
  //       "JLIUp4gZTGVFRMTK0fBwcpyPtRp1"
  //     ),
  //     {
  //       email: "sowon.jun@sowaustralia.com",
  //       name: "Sowon Jun",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "ccSgQTXvLRnin0OjwvRM",
  //       "members",
  //       "2025",
  //       "members",
  //       "Q9zmKA4VQsUv3hqqIHdCDyg9pgB2"
  //     ),
  //     {
  //       email: "david.song@sowaustralia.com",
  //       name: "David Song",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "5", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "ccSgQTXvLRnin0OjwvRM",
  //       "members",
  //       "2025",
  //       "members",
  //       "o9ixc8N6hVVQUEntTz1AAdC36e22"
  //     ),
  //     {
  //       email: "natalie.kwok@sowaustralia.com",
  //       name: "Natalie Kwok",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "ccSgQTXvLRnin0OjwvRM",
  //       "members",
  //       "2025",
  //       "members",
  //       "ydMmaGu87XSMtQdDIHwXGwvz4Uh1"
  //     ),
  //     {
  //       email: "joshua.quek@sowaustralia.com",
  //       name: "Joshua Quek",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );

  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "ccSgQTXvLRnin0OjwvRM",
  //       "metadata",
  //       "wOoTm2Vtr1geLVZMh0Kl"
  //     ),
  //     {
  //       key: "campus",
  //       values: {
  //         "1": "University of New South Wales",
  //         "2": "Macquarie University",
  //         "3": "University of Sydney",
  //         "4": "University of Technology, Sydney",
  //       },
  //     }
  //   );

  //   // USYD
  //   console.log("USYD");
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "MUSmSaufEfgdJUX4Kx4G",
  //       "metadata",
  //       "U65Ey0liZ6OeVqSusDtN"
  //     ),
  //     {
  //       key: "year",
  //       values: { "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "MUSmSaufEfgdJUX4Kx4G",
  //       "metadata",
  //       "9xYciY30OtXXUjEO5ao0"
  //     ),
  //     {
  //       key: "role",
  //       values: {
  //         "1": "Member",
  //         "2": "Student Leader",
  //         "3": "Executive",
  //         "4": "Vice President",
  //         "5": "Presdient",
  //         "6": "Staff",
  //       },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "MUSmSaufEfgdJUX4Kx4G",
  //       "metadata",
  //       "wOoTm2Vtr1geLVZMh0Kl"
  //     ),
  //     {
  //       key: "campus",
  //       values: {
  //         "1": "University of New South Wales",
  //         "2": "Macquarie University",
  //         "3": "University of Sydney",
  //         "4": "University of Technology, Sydney",
  //       },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "MUSmSaufEfgdJUX4Kx4G",
  //       "tags",
  //       "drZ7gnjIG0MZPGtYt6jO"
  //     ),
  //     { name: "Weekly Meeting", colour: "green" }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "MUSmSaufEfgdJUX4Kx4G",
  //       "tags",
  //       "luecfMmQycSWS4TaNHsF"
  //     ),
  //     { key: "Roadtrip", colour: "red" }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "MUSmSaufEfgdJUX4Kx4G",
  //       "members",
  //       "2025",
  //       "members",
  //       "1deVspvZrLXZCnLz6Afb0CTAAuo2"
  //     ),
  //     {
  //       email: "erlina.yang@sowaustralia.com",
  //       name: "Erlina Yang",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "MUSmSaufEfgdJUX4Kx4G",
  //       "members",
  //       "2025",
  //       "members",
  //       "JLIUp4gZTGVFRMTK0fBwcpyPtRp1"
  //     ),
  //     {
  //       email: "sowon.jun@sowaustralia.com",
  //       name: "Sowon Jun",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "MUSmSaufEfgdJUX4Kx4G",
  //       "members",
  //       "2025",
  //       "members",
  //       "Q9zmKA4VQsUv3hqqIHdCDyg9pgB2"
  //     ),
  //     {
  //       email: "david.song@sowaustralia.com",
  //       name: "David Song",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "5", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "MUSmSaufEfgdJUX4Kx4G",
  //       "members",
  //       "2025",
  //       "members",
  //       "o9ixc8N6hVVQUEntTz1AAdC36e22"
  //     ),
  //     {
  //       email: "natalie.kwok@sowaustralia.com",
  //       name: "Natalie Kwok",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "MUSmSaufEfgdJUX4Kx4G",
  //       "members",
  //       "2025",
  //       "members",
  //       "ydMmaGu87XSMtQdDIHwXGwvz4Uh1"
  //     ),
  //     {
  //       email: "joshua.quek@sowaustralia.com",
  //       name: "Joshua Quek",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "1" },
  //     }
  //   );

  //   // UTS
  //   console.log("UTS");
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "wrsDV3XfwQB4RD7BxKD2",
  //       "metadata",
  //       "U65Ey0liZ6OeVqSusDtN"
  //     ),
  //     {
  //       key: "year",
  //       values: { "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "wrsDV3XfwQB4RD7BxKD2",
  //       "metadata",
  //       "9xYciY30OtXXUjEO5ao0"
  //     ),
  //     {
  //       key: "role",
  //       values: {
  //         "1": "Member",
  //         "2": "Student Leader",
  //         "3": "Executive",
  //         "4": "Vice President",
  //         "5": "Presdient",
  //         "6": "Staff",
  //       },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "wrsDV3XfwQB4RD7BxKD2",
  //       "metadata",
  //       "wOoTm2Vtr1geLVZMh0Kl"
  //     ),
  //     {
  //       key: "campus",
  //       values: {
  //         "1": "University of New South Wales",
  //         "2": "Macquarie University",
  //         "3": "University of Sydney",
  //         "4": "University of Technology, Sydney",
  //       },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "wrsDV3XfwQB4RD7BxKD2",
  //       "tags",
  //       "drZ7gnjIG0MZPGtYt6jO"
  //     ),
  //     { name: "Weekly Meeting", colour: "green" }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "wrsDV3XfwQB4RD7BxKD2",
  //       "tags",
  //       "luecfMmQycSWS4TaNHsF"
  //     ),
  //     { key: "Roadtrip", colour: "red" }
  //   );

  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "wrsDV3XfwQB4RD7BxKD2",
  //       "members",
  //       "2025",
  //       "members",
  //       "0wyj3pxC3vcRy9Z3atMc3cmz5Hw2"
  //     ),
  //     {
  //       email: "timothy.yatco@sowaustralia.com",
  //       name: "Timothy Yatco",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "5", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "wrsDV3XfwQB4RD7BxKD2",
  //       "members",
  //       "2025",
  //       "members",
  //       "4AGFO0S2A9cxBw91phnPj92FbP93"
  //     ),
  //     {
  //       email: "aaron.valdez@sowaustralia.com",
  //       name: "Aaron Valdez",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "wrsDV3XfwQB4RD7BxKD2",
  //       "members",
  //       "2025",
  //       "members",
  //       "8lfUbYE0JOfJ37kkyQJxCt6kegQ2"
  //     ),
  //     {
  //       email: "josh.kim@sowaustralia.com",
  //       name: "Josh Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "7", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "wrsDV3XfwQB4RD7BxKD2",
  //       "members",
  //       "2025",
  //       "members",
  //       "OD0GmgnNRiSm813GNIHaMXCAioC2"
  //     ),
  //     {
  //       email: "louise.park@sowaustralia.com",
  //       name: "Louise Park",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "wrsDV3XfwQB4RD7BxKD2",
  //       "members",
  //       "2025",
  //       "members",
  //       "aKA5nxyYABWpWmHFSumubT4Ooos1"
  //     ),
  //     {
  //       email: "chloe.moon@sowaustralia.com",
  //       name: "Chloe Moon",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "4" },
  //     }
  //   );

  //   // MACQ
  //   console.log("MACQ");
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "metadata",
  //       "U65Ey0liZ6OeVqSusDtN"
  //     ),
  //     {
  //       key: "year",
  //       values: { "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "metadata",
  //       "9xYciY30OtXXUjEO5ao0"
  //     ),
  //     {
  //       key: "role",
  //       values: {
  //         "1": "Member",
  //         "2": "Student Leader",
  //         "3": "Executive",
  //         "4": "Vice President",
  //         "5": "Presdient",
  //         "6": "Staff",
  //       },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "metadata",
  //       "wOoTm2Vtr1geLVZMh0Kl"
  //     ),
  //     {
  //       key: "campus",
  //       values: {
  //         "1": "University of New South Wales",
  //         "2": "Macquarie University",
  //         "3": "University of Sydney",
  //         "4": "University of Technology, Sydney",
  //       },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "tags",
  //       "drZ7gnjIG0MZPGtYt6jO"
  //     ),
  //     { name: "Weekly Meeting", colour: "green" }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "tags",
  //       "luecfMmQycSWS4TaNHsF"
  //     ),
  //     { key: "Roadtrip", colour: "red" }
  //   );

  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "0cSYfuExa3dpxHQ8SQi5RBWbwIz2"
  //     ),
  //     {
  //       email: "jacquie.liu@sowaustralia.com",
  //       name: "Jacquie Liu",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "2bFZALlQZ8aIXKMR4YVMAnMIM8v1"
  //     ),
  //     {
  //       email: "nathan.shi@sowaustralia.com",
  //       name: "Nathan Shi",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "IF3qEpUyHCdyOrdtbkfLM4IVwsI2"
  //     ),
  //     {
  //       email: "andrew.lee@sowaustralia.com",
  //       name: "Andrew Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "MC6yGrOgN1RTLp5ikl1RUDYqo382"
  //     ),
  //     {
  //       email: "joy.shin@sowaustralia.com",
  //       name: "Joy Shin",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "Ojmar4CYcaPMYzb7ZiTjuQ6P0Lq1"
  //     ),
  //     {
  //       email: "sarah.shin@sowaustralia.com",
  //       name: "Sarah Shin",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "Sl954L1pwGe3SsYUZT2sislWt3s2"
  //     ),
  //     {
  //       email: "ashley.kim2@sowaustralia.com",
  //       name: "Ashley Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "3" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "TOfcW43oTbel2FTEsaf4EY8FXlp1"
  //     ),
  //     {
  //       email: "yebin.lee@sowaustralia.com",
  //       name: "Yebin Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "TnVzFVOHjyezXTkO0RUh3mkrZQD3"
  //     ),
  //     {
  //       email: "benjamin.kim@sowaustralia.com",
  //       name: "Benjamin Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "iyGgzJCc46SczXTbENmoeD595rX2"
  //     ),
  //     {
  //       email: "jisue.shim@sowaustralia.com",
  //       name: "Jisue Shim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "2", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "lqYBTpWtPwV1kQLeOePKuFyloxW2"
  //     ),
  //     {
  //       email: "justin.hung@sowaustralia.com",
  //       name: "Justin Hung",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "6", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "s11eFLnX0ae1UyQPjqN5KMJa5DE2"
  //     ),
  //     {
  //       email: "joanne.kim@sowaustralia.com",
  //       name: "Joanne Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "vOyvsZD7UoT4z2nthdBxM6ArdH92"
  //     ),
  //     {
  //       email: "irene.lee@sowaustralia.com",
  //       name: "Irene Lee",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "5", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );
  //   await setDoc(
  //     doc(
  //       firestore,
  //       "groups",
  //       "CZHRnKJ8SDnfMIw64WJu",
  //       "members",
  //       "2025",
  //       "members",
  //       "ywRk5Lgx1zOqAK2qdaYp7HAFOBw2"
  //     ),
  //     {
  //       email: "yeonwoo.kim@sowaustralia.com",
  //       name: "Yeonwoo Kim",
  //       metadata: { "9xYciY30OtXXUjEO5ao0": "4", wOoTm2Vtr1geLVZMh0Kl: "2" },
  //     }
  //   );

  //   console.log("DONE");
  // };

  return (
    user && (
      <AuthCheck>
        <Topbar />
        <div className="mx-6">
          <h1 className="text-2xl text-gray-700 mb-4">Admin Page</h1>
          <button
            type="button"
            className="p-2 bg-slate-200"
            // onClick={() => addMembers()}
          >
            Add all leaders
          </button>
        </div>
      </AuthCheck>
    )
  );
}
