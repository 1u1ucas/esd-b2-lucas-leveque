"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { ArticlesDocument } from "../../../prismicio-types";

/**
 * Props for `ArticlePart`.
 */

const ArticlePart = (): JSX.Element => {
  const [articles, setArticles] = useState<ArticlesDocument[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<ArticlesDocument | null>(null);

  // Fetch articles on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      const client = createClient();
      const response = await client.getByType("articles");
      setArticles(response.results);
    };
    fetchArticles();
  }, []);

  // Close the detailed view
  const closeDetailView = () => setSelectedArticle(null);

  return (
    <section className={styles.articlesSection}>
      <div className={styles.cardsContainer}>
        {articles.map((article, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => setSelectedArticle(article)}
          >
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>
                <PrismicRichText field={article.data.title} />
              </div>
              <p className={styles.cardDate}>{article.data.release_date}</p>
              <div className={styles.cardDescription}>
                <PrismicRichText field={article.data.content} />
              </div>
              <a href={`/articles/${article.uid}`} className={styles.cardButton}>
                Lire l'article
              </a>
            </div>
          </div>
        ))}
      </div>

      {selectedArticle && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button onClick={closeDetailView} className={styles.closeButton}>
              &times;
            </button>
            <h2 className={styles.modalTitle}>
              <PrismicRichText field={selectedArticle.data.title} />
            </h2>
            <p className={styles.modalDate}>{selectedArticle.data.release_date}</p>
            <div className={styles.modalAuthor}>
              <strong>Auteur :</strong> {selectedArticle.data.author}
            </div>
            <div className={styles.modalImage}>
              <img
                src={selectedArticle.data.image?.url ?? ""}
                alt={selectedArticle.data.image?.alt ?? ""}
              />
            </div>
            <div className={styles.modalContentText}>
              <PrismicRichText field={selectedArticle.data.content} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ArticlePart;
