import styled from "styled-components";

// Card components
export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.md};
  padding: 1.5rem;
`;

export const CardHeader = styled.div`
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize.xl};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const CardContent = styled.div``;

// Typography
export const Heading1 = styled.h1`
  font-size: ${(props) => props.theme.typography.fontSize["3xl"]};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const Heading2 = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize["2xl"]};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const Heading3 = styled.h3`
  font-size: ${(props) => props.theme.typography.fontSize.xl};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const Subtitle1 = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const Subtitle2 = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.base};
  color: ${(props) => props.theme.colors.text.secondary};
`;

export const Text = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.base};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const SmallText = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  color: ${(props) => props.theme.colors.text.secondary};
`;

// Form components
export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: ${(props) => props.theme.typography.fontSize.base};
  border: 1px solid ${(props) => props.theme.colors.divider};
  border-radius: ${(props) => props.theme.borderRadius.md};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light}40;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: ${(props) => props.theme.typography.fontSize.base};
  border: 1px solid ${(props) => props.theme.colors.divider};
  border-radius: ${(props) => props.theme.borderRadius.md};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light}40;
  }
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 0.5rem;
`;

// Button components
interface ButtonProps {
  $variant?: "primary" | "secondary" | "error" | "success" | "warning";
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: ${(props) => props.theme.typography.fontSize.base};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;

  background-color: ${(props) => {
    switch (props.$variant) {
      case "secondary":
        return props.theme.colors.secondary.main;
      case "error":
        return props.theme.colors.error.main;
      case "success":
        return props.theme.colors.success.main;
      case "warning":
        return props.theme.colors.warning.main;
      default:
        return props.theme.colors.primary.main;
    }
  }};

  color: ${(props) => {
    switch (props.$variant) {
      case "warning":
        return props.theme.colors.warning.contrastText;
      case "secondary":
        return props.theme.colors.secondary.contrastText;
      case "error":
        return props.theme.colors.error.contrastText;
      case "success":
        return props.theme.colors.success.contrastText;
      default:
        return props.theme.colors.primary.contrastText;
    }
  }};

  border: 1px solid transparent;

  &:hover {
    background-color: ${(props) => {
      switch (props.$variant) {
        case "secondary":
          return props.theme.colors.secondary.dark;
        case "error":
          return props.theme.colors.error.dark;
        case "warning":
          return "#e29209"; // slightly darker
        case "success":
          return "#0da771"; // slightly darker
        default:
          return props.theme.colors.primary.dark;
      }
    }};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Layout components
export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;

  ${(props) => props.theme.media.xl} {
    max-width: 1536px;
    padding: 0 2rem;
  }
`;

export const Flex = styled.div`
  display: flex;
`;

export const Grid = styled.div<{ cols?: number; $gap?: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols || 1}, 1fr);
  gap: ${(props) => props.theme.spacing(props.$gap || 4)};
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;

  & > * {
    padding: 0.5rem;
  }
`;

export const Col = styled.div<{
  size?: number;
  md?: number;
  lg?: number;
  xl?: number;
}>`
  flex: 0 0 ${(props) => (props.size ? (props.size / 12) * 100 : 100)}%;
  max-width: ${(props) => (props.size ? (props.size / 12) * 100 : 100)}%;

  ${(props) => props.md && props.theme.media.md} {
    flex: 0 0 ${(props) => (props?.md ? (props.md / 12) * 100 : 100)}%;
    max-width: ${(props) => (props?.md ? (props.md / 12) * 100 : 100)}%;
  }

  ${(props) => props.lg && props.theme.media.lg} {
    flex: 0 0 ${(props) => (props?.lg ? (props.lg / 12) * 100 : 100)}%;
    max-width: ${(props) => (props?.lg ? (props.lg / 12) * 100 : 100)}%;
  }

  ${(props) => props.xl && props.theme.media.xl} {
    flex: 0 0 ${(props) => (props?.xl ? (props.xl / 12) * 100 : 100)}%;
    max-width: ${(props) => (props?.xl ? (props.xl / 12) * 100 : 100)}%;
  }
`;

// Spacers
export const Spacer = styled.div<{ size?: number }>`
  height: ${(props) => props.theme.spacing(props.size || 4)};
`;

// Dividers
export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${(props) => props.theme.colors.divider};
  margin: ${(props) => props.theme.spacing(2)} 0;
`;
