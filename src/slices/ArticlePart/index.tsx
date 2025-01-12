"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import styles from "./index.module.css";

/**
 * Props for `ArticlePart`.
 */
export type ArticlePartProps = SliceComponentProps<Content.ArticlePartSlice>;

/**
 * ArticlePart component.
 */
const ArticlePart = ({ slice }: ArticlePartProps): JSX.Element => {
  const { title, content, image } = slice.primary;

  // Limit content to 300 characters
  const limitedContent = content && content.length > 0
    ? [{ ...content[0], text: content[0].text.slice(0, 300) }]
    : null;

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
      {limitedContent ? (
        <div>
          <PrismicRichText field={limitedContent} />
        </div>
      ) : (
        <p className={styles.placeholder}>Description indisponible</p>
      )}

      {/* Button to navigate to the article page */}
      <Link href={`/articles/${slice.id}`}>
        <div className={styles.readMoreButton}>Lire l'article</div>
      </Link>
    </div>
  );
};

export default ArticlePart;