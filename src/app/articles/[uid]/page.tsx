"use client";

import { use, useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import SingleArticle from "../../../slices/SingleArticle/index"; // Adjust the import path as needed
import { ArticlesDocument } from "../../../../prismicio-types";
import styles from "./page.module.css";

type Props = {
    params: Promise<{ uid: string }>;
  };
  
  const client = createClient();
  
  const ArticlePage = ({ params }: Props) => {
    const unwrappedParams = use(params);
    const { uid } = unwrappedParams;
  const [article, setArticle] = useState<ArticlesDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        const client = createClient();
        const response = await client.getByID(uid as string);
        setArticle(response);
      } catch (err) {
        setError("Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [uid]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div>
      {article && (
        <SingleArticle
          slice={{
            slice_type: "single_article",
            slice_label: null,
            id: article.id,
            variation: "default", // or "top3" if applicable
            version: "1.0.0",
            primary: {
              title: article.data.title,
              content: article.data.content,
              image: article.data.image,
              // Add other fields as needed
            },
            items: [],
          }}
          index={0}
          slices={[article]}
          context={{}}
        />
      )}
    </div>
  );
};

export default ArticlePage;