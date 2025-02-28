import React, { useEffect, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "./extensions/FontSize";
import DOMPurify from "dompurify";
import styled from "styled-components";
import { useTemplateStyles } from "./TemplateStyleManager";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  contentType?: "summary" | "jobDescription" | "education" | "skills";
  useTemplateDefaults?: boolean;
}

interface FormatConfig {
  fontFamily: string;
  fontSize: string;
  color: string;
  alignment: string;
  fontWeight: number;
  underline?: boolean;
  italics?: boolean;
}

// Styled components defined as before...
const EditorContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.divider};
  border-radius: ${(props) => props.theme.borderRadius.md};
  overflow: hidden;

  &:focus-within {
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light}40;
  }
`;

const StyledEditorContent = styled(EditorContent)`
  .ProseMirror {
    padding: 0.5rem;
    outline: none;

    p {
      margin: 0.5em 0;
    }

    ul,
    ol {
      padding-left: 1.5rem;
    }

    ul li {
      list-style-type: disc;
    }

    ol li {
      list-style-type: decimal;
    }

    &:focus {
      outline: none;
    }

    p.is-editor-empty:first-child::before {
      color: ${(props) => props.theme.colors.text.disabled};
      content: attr(data-placeholder);
      float: left;
      height: 0;
      pointer-events: none;
    }

    /* Text alignment styles */
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
  }
`;

const MenuBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.25rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.divider};
  background-color: ${(props) => props.theme.colors.gray[50]};
`;

const MenuSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-right: 0.5rem;
  padding-right: 0.5rem;
  border-right: 1px solid ${(props) => props.theme.colors.divider};

  &:last-child {
    border-right: none;
  }
`;

interface MenuButtonProps {
  $isActive?: boolean;
}

const MenuButton = styled.button<MenuButtonProps>`
  background-color: ${(props) =>
    props.$isActive ? props.theme.colors.primary.main : "transparent"};
  color: ${(props) =>
    props.$isActive
      ? props.theme.colors.primary.contrastText
      : props.theme.colors.text.primary};
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? props.theme.colors.primary.main
        : props.theme.colors.divider};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 0.25rem 0.5rem;
  margin-right: 0.25rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$isActive
        ? props.theme.colors.primary.dark
        : props.theme.colors.gray[100]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SelectDropdown = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.divider};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.colors.gray[400]};
  }

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light}40;
  }
`;

const ColorPicker = styled.input.attrs({ type: "color" })`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: 1px solid ${(props) => props.theme.colors.divider};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: transparent;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 2px;
  }
`;

const FloatingMenu = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.background.paper};
  border: 1px solid ${(props) => props.theme.colors.divider};
  border-radius: ${(props) => props.theme.borderRadius.md};
  box-shadow: ${(props) => props.theme.shadows.md};
  padding: 0.25rem;
  margin-bottom: 0.5rem;
`;

const FloatingMenuButton = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.colors.text.primary};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray[100]};
  }
`;

const fontFamilyOptions = [
  { value: "Arial, sans-serif", label: "Arial" },
  { value: "Helvetica, sans-serif", label: "Helvetica" },
  { value: "Times New Roman, serif", label: "Times New Roman" },
  { value: "Garamond, serif", label: "Garamond" },
  { value: "Georgia, serif", label: "Georgia" },
  { value: "Courier New, monospace", label: "Courier New" },
  { value: "Calibri, sans-serif", label: "Calibri" },
  { value: "Verdana, sans-serif", label: "Verdana" },
  { value: "Tahoma, sans-serif", label: "Tahoma" },
];

const fontSizeOptions = [
  { value: "10px", label: "10px" },
  { value: "12px", label: "12px" },
  { value: "14px", label: "14px" },
  { value: "16px", label: "16px" },
  { value: "18px", label: "18px" },
  { value: "20px", label: "20px" },
  { value: "24px", label: "24px" },
  { value: "30px", label: "30px" },
  { value: "36px", label: "36px" },
];

// Template formatting styles menu
const TemplateStylesMenu = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.25rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.divider};
  background-color: ${(props) => props.theme.colors.primary.light}25;
`;

const StylePresetButton = styled.button`
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.colors.divider};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 0.25rem 0.5rem;
  margin-right: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray[100]};
  }
`;

const TemplateFormattingLabel = styled.span`
  font-size: 0.75rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-right: 0.5rem;
  align-self: center;
`;

// The enhanced rich text editor with template styling awareness
const TemplateAwareRichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start typing...",
  minHeight,
  contentType = "summary",
  useTemplateDefaults = true,
}) => {
  // Get template styles from context
  const { getEditorConfig, getCustomStyles } = useTemplateStyles();

  // Initialize state with template defaults if requested
  const templateConfig = getEditorConfig();
  const [selectedTextColor, setSelectedTextColor] = useState<string>(
    useTemplateDefaults ? templateConfig.textColor : "#000000"
  );
  const [selectedFontFamily, setSelectedFontFamily] = useState<string>(
    useTemplateDefaults ? templateConfig.fontFamily : ""
  );
  const [selectedFontSize, setSelectedFontSize] = useState<string>(
    useTemplateDefaults ? templateConfig.fontSize : ""
  );

  // Initialize the editor with template-aware configuration
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      TextAlign.configure({
        types: ["paragraph", "heading"],
        alignments: ["left", "center", "right", "justify"],
        defaultAlignment: templateConfig.alignment,
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      // Sanitize HTML before passing it up
      const sanitizedHtml = DOMPurify.sanitize(editor.getHTML());
      onChange(sanitizedHtml);
    },
  });

  // Update editor when template changes
  useEffect(() => {
    if (useTemplateDefaults && editor) {
      const config = getEditorConfig();

      // Apply template defaults to editor without focusing
      editor
        .chain()
        .setFontFamily(config.fontFamily)
        .setFontSize(config.fontSize)
        .setColor(config.textColor)
        .setTextAlign(
          config.alignment as "left" | "center" | "right" | "justify"
        )
        .run();

      // Update local state
      setSelectedFontFamily(config.fontFamily);
      setSelectedFontSize(config.fontSize);
      setSelectedTextColor(config.textColor);
    }
  }, [getEditorConfig, useTemplateDefaults, editor]);

  // Update editor content if external value changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Early return if editor isn't initialized
  if (!editor) {
    return null;
  }

  // Apply template preset formatting to selected text
  const applyTemplatePreset = (presetType: string) => {
    switch (presetType) {
      case "sectionTitle": {
        const styles = getCustomStyles("sectionTitle");
        editor
          .chain()
          .setFontFamily(styles.fontFamily as string)
          .setFontSize(styles.fontSize as string)
          .setColor(styles.color as string)
          .setTextAlign(
            styles.textAlign as "left" | "center" | "right" | "justify"
          )
          .run();
        if (styles.textDecoration === "underline") {
          editor.chain().toggleUnderline().run();
        }
        editor.chain().toggleBold().run();
        break;
      }
      case "jobTitle": {
        const styles = getCustomStyles("jobTitle");
        editor
          .chain()
          .setFontFamily(styles.fontFamily as string)
          .setFontSize(styles.fontSize as string)
          .setColor(styles.color as string)
          .setTextAlign(
            styles.textAlign as "left" | "center" | "right" | "justify"
          )
          .run();
        editor.chain().toggleBold().run();
        break;
      }
      case "companyName": {
        const styles = getCustomStyles("companyName");
        editor
          .chain()
          .setFontFamily(styles.fontFamily as string)
          .setFontSize(styles.fontSize as string)
          .setColor(styles.color as string)
          .run();
        if (styles.fontStyle === "italic") {
          editor.chain().toggleItalic().run();
        }
        break;
      }
      case "bullet":
        editor.chain().toggleBulletList().run();
        break;
      default:
        break;
    }
  };

  // Handle standard editor changes as before
  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedTextColor(color);
    editor.chain().setColor(color).run();
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fontFamily = e.target.value;
    setSelectedFontFamily(fontFamily);
    editor.chain().setFontFamily(fontFamily).run();
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fontSize = e.target.value;
    setSelectedFontSize(fontSize);
    editor.chain().setFontSize(fontSize).run();
  };

  return (
    <EditorContainer>
      {useTemplateDefaults && (
        <TemplateStylesMenu>
          <TemplateFormattingLabel>Template Styles:</TemplateFormattingLabel>
          <StylePresetButton
            onClick={() => applyTemplatePreset("sectionTitle")}
            title="Apply section title style"
          >
            Section Title
          </StylePresetButton>
          <StylePresetButton
            onClick={() => applyTemplatePreset("jobTitle")}
            title="Apply job title style"
          >
            Job Title
          </StylePresetButton>
          <StylePresetButton
            onClick={() => applyTemplatePreset("companyName")}
            title="Apply company name style"
          >
            Company
          </StylePresetButton>
          <StylePresetButton
            onClick={() => applyTemplatePreset("bullet")}
            title="Format as bullet list using template style"
          >
            Bullet List
          </StylePresetButton>
        </TemplateStylesMenu>
      )}

      {/* Standard formatting toolbar (as in the original RichTextEditor) */}
      <MenuBar>
        {/* Text formatting */}
        <MenuSection>
          <MenuButton
            onClick={() => editor.chain().toggleBold().run()}
            $isActive={editor.isActive("bold")}
            type="button"
            title="Bold"
          >
            B
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().toggleItalic().run()}
            $isActive={editor.isActive("italic")}
            type="button"
            title="Italic"
          >
            I
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().toggleUnderline().run()}
            $isActive={editor.isActive("underline")}
            type="button"
            title="Underline"
          >
            U
          </MenuButton>
        </MenuSection>

        {/* Lists */}
        <MenuSection>
          <MenuButton
            onClick={() => editor.chain().toggleBulletList().run()}
            $isActive={editor.isActive("bulletList")}
            type="button"
            title="Bullet List"
          >
            • List
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().toggleOrderedList().run()}
            $isActive={editor.isActive("orderedList")}
            type="button"
            title="Numbered List"
          >
            1. List
          </MenuButton>
        </MenuSection>

        {/* Alignment */}
        <MenuSection>
          <MenuButton
            onClick={() => editor.chain().setTextAlign("left").run()}
            $isActive={editor.isActive({ textAlign: "left" })}
            type="button"
            title="Align Left"
          >
            ← Align
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().setTextAlign("center").run()}
            $isActive={editor.isActive({ textAlign: "center" })}
            type="button"
            title="Align Center"
          >
            ↔ Align
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().setTextAlign("right").run()}
            $isActive={editor.isActive({ textAlign: "right" })}
            type="button"
            title="Align Right"
          >
            → Align
          </MenuButton>
        </MenuSection>

        {/* Typography */}
        <MenuSection>
          <SelectDropdown
            value={selectedFontFamily}
            onChange={handleFontFamilyChange}
            title="Font Family"
          >
            <option value="">Font</option>
            {fontFamilyOptions.map((font) => (
              <option key={font.label} value={font.value}>
                {font.label}
              </option>
            ))}
          </SelectDropdown>

          <SelectDropdown
            value={selectedFontSize}
            onChange={handleFontSizeChange}
            title="Font Size"
          >
            <option value="">Size</option>
            {fontSizeOptions.map((size) => (
              <option key={size.label} value={size.value}>
                {size.label}
              </option>
            ))}
          </SelectDropdown>

          <ColorPicker
            value={selectedTextColor}
            onChange={handleTextColorChange}
            title="Text Color"
          />
        </MenuSection>
      </MenuBar>

      {/* Bubble menu for inline formatting */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <FloatingMenu>
            <FloatingMenuButton
              onClick={() => editor.chain().toggleBold().run()}
              title="Bold"
            >
              B
            </FloatingMenuButton>
            <FloatingMenuButton
              onClick={() => editor.chain().toggleItalic().run()}
              title="Italic"
            >
              I
            </FloatingMenuButton>
            <FloatingMenuButton
              onClick={() => editor.chain().toggleUnderline().run()}
              title="Underline"
            >
              U
            </FloatingMenuButton>
          </FloatingMenu>
        </BubbleMenu>
      )}

      {/* Editor content */}
      <div style={{ minHeight: minHeight || "120px" }}>
        <StyledEditorContent editor={editor} />
      </div>
    </EditorContainer>
  );
};

export default TemplateAwareRichTextEditor;
