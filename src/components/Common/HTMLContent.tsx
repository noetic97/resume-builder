import React from "react";
import styled from "styled-components";
import DOMPurify from "dompurify";

interface HTMLContentProps {
  html: string;
  $template?: any;
  className?: string;
}

// This will be used for sections that need to render HTML content
const HTMLContent = styled.div<{ $template?: any }>`
  ${(props) => props.$template?.text || ""}

  /* Style the content from TipTap */
  ul, ol {
    padding-left: 1.5rem;
  }

  ul li {
    list-style-type: disc;
  }

  ol li {
    list-style-type: decimal;
  }

  p {
    margin: 0;
    margin-bottom: 0.25rem;
  }

  strong {
    font-weight: bold;
  }

  em {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  /* Text alignment classes */
  .text-left {
    text-align: left;
  }

  .text-center {
    text-align: center;
  }

  .text-right {
    text-align: right;
  }

  .text-justify {
    text-align: justify;
  }

  /* Handle font families and sizes properly */
  [style*="font-family"] {
    font-family: inherit; /* First use the inherited font */
  }

  [style*="font-size"] {
    /* Ensure font sizes are proportional to the base size */
    font-size: inherit; /* First use the inherited size */
  }

  /* This ensures the inline styles from TipTap are honored */
  * {
    font-family: inherit;

    &[style*="font-family"] {
      font-family: attr(style);
    }

    &[style*="color"] {
      color: attr(style);
    }

    &[style*="font-size"] {
      font-size: attr(style);
    }
  }
`;

// Component that safely renders HTML content
const SafeHTMLContent: React.FC<HTMLContentProps> = ({
  html,
  $template,
  className,
}) => {
  // Only render if there's content
  if (!html) return null;

  // Configure DOMPurify to allow styling attributes
  const purifyConfig = {
    ADD_TAGS: ["style"],
    ADD_ATTR: ["target", "style", "class"],
  };

  // Sanitize HTML to prevent XSS attacks
  const sanitizedHTML = DOMPurify.sanitize(html, purifyConfig);

  return (
    <HTMLContent
      $template={$template}
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

export default SafeHTMLContent;
