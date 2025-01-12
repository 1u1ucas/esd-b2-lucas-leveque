"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import ArticlePart from "../../slices/ArticlePart/index"; // Adjust the import path as needed
import { ArticlesDocument } from "../../../prismicio-types";
import styles from "./page.module.css";

const ArticlePage = () => {
  const [articles, setArticles] = useState<ArticlesDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const client = createClient();
        const response = await client.getByType("articles", {
          orderings: [{ field: "my.articles.release_date", direction: "desc" }],
        });
        setArticles(response.results);
      } catch (err) {
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.articlesPage}>
      {articles.map((article) => (
        <ArticlePart
          key={article.id}
          slice={{
            slice_type: "article_part",
            slice_label: null,
            id: article.id,
            variation: "default",
            version: "1.0.0",
            primary: {
              title: article.data.title,
              content: article.data.content,
              image: article.data.image,
              date: article.data.release_date,
              author: article.data.author,
            },
            items: [],
          }}
        />
      ))}
    </div>
  );
};

export default ArticlePage;