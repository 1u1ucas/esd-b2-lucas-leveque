import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from "@prismicio/react";
import styles from "./index.module.css";

/**
 * Serializer for custom rich text rendering.
 */
const components: JSXMapSerializer = {
  hyperlink: ({ node, children }) => (
    <PrismicNextLink field={node.data} className={styles.hyperlink}>
      {children}
    </PrismicNextLink>
  ),
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code className={styles.codespan}>{children}</code>;
    }
    return <span className={styles.label}>{children}</span>;
  },
  heading1: ({ children }) => (
    <h1 className={styles.heading1}>{children}</h1>
  ),
  heading2: ({ children }) => (
    <h2 className={styles.heading2}>{children}</h2>
  ),
  heading3: ({ children }) => (
    <h3 className={styles.heading3}>{children}</h3>
  ),
  paragraph: ({ children }) => (
    <p className={styles.paragraph}>{children}</p>
  ),
  listItem: ({ children }) => (
    <li className={styles.listItem}>{children}</li>
  ),
  oListItem: ({ children }) => (
    <li className={styles.oListItem}>{children}</li>
  ),
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText = ({ slice }: RichTextProps): JSX.Element => {
  return (
    <section className={styles.richText}>
      <PrismicRichText field={slice.primary.content} components={components} />
    </section>
  );
};

export default RichText;
