"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import styles from "./index.module.css";

/**
 * Props for `SingleArticle`.
 */
export type ArticlePartProps = SliceComponentProps<Content.SingleArticleSlice>;

/**
 * SingleArticle component.
 */
const SingleArticle = ({ slice }: ArticlePartProps): JSX.Element => {
  const { title, content, image, author, date } = slice.primary;

  return (
    <div className={styles.articleCard}>
      {/* Titre de l'article */}
      {title ? (
        <PrismicRichText field={title} />
      ) : (
        <h2 className={styles.placeholder}>Titre indisponible</h2> 
      )}

      {/* Image de l'article */}
      {image?.url && (
        <img
          src={image.url}
          alt={image.alt || "Image de l'article"}
          className={styles.articleImage}
        />
      )}

      {/* Description de l'article */}
      {content ? (
        <div>
          <PrismicRichText field={content} />
        </div>
      ) : (
        <p className={styles.placeholder}>Description indisponible</p>
      )}

      {/* Auteur de l'article */}
      {author ? (
        <p className={styles.author}>Auteur: {author}</p>
      ) : (
        <p className={styles.placeholder}>Auteur indisponible</p>
      )}

      {/* Date de l'article */}
      {date ? (
        <p className={styles.date}>Date: {date}</p>
      ) : (
        <p className={styles.placeholder}>Date indisponible</p>
      )}
    </div>
  );
};

export default SingleArticle;