import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

export default function useGetTrendingContent() {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const resp = await axios.get(`/api/v1/${contentType}/trending`);
        setTrendingContent(resp.data.content);
      } catch (error) {
        console.log(">>> error fetching trending content", error);
      }
    };
    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
}
