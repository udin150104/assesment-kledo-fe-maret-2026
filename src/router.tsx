import { createBrowserRouter } from "react-router-dom";
import HSF from "./layouts/HSF";
import Home from "./pages/Home";

export const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <HSF />,
    loader: async () => {
      const urls = [
        "/data/json/province.json",
        "/data/json/regencies.json",
        "/data/json/districts.json",
      ];

      const results = await Promise.all(
        urls.map(async (url) => {
          try {
            const res = await fetch(url);
            if (!res.ok) return [];
            const data = await res.json();
            return data ?? [];
          } catch (error) {
            console.error(`Gagal fetch ${url}:`, error);
            return [];
          }
        }),
      );

      const [provinces, regencies, districts] = results;

      // console.log(provinces, regencies, districts);
      return { provinces, regencies, districts };
    },
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
