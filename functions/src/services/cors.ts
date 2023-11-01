import cors from "cors";

export const functionsConfig = {
  whitelist: ["http://localhost:3000", "https://timetorollcall.web.app/"],
};

export const options: cors.CorsOptions = {
  origin: functionsConfig.whitelist,
};
