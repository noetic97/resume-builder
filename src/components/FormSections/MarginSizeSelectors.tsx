import React from "react";
import styled from "styled-components";

type MarginSize = "small" | "medium" | "large";

interface MarginSizeSelectorProps {
  selectedMarginSize: MarginSize;
  onChange: (size: MarginSize) => void;
}

const Title = styled.h3`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

interface SizeBtnProps {
  isSelected: boolean;
}

const SizeButton = styled.button<SizeBtnProps>`
  padding: 0.25rem 0.75rem;
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  background-color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primary.main
      : props.theme.colors.gray[100]};
  color: ${(props) =>
    props.isSelected
      ? props.theme.colors.primary.contrastText
      : props.theme.colors.gray[800]};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.isSelected
        ? props.theme.colors.primary.main
        : props.theme.colors.gray[200]};
  }
`;

const MarginSizeSelector: React.FC<MarginSizeSelectorProps> = ({
  selectedMarginSize,
  onChange,
}) => {
  return (
    <div>
      <Title>Page Margin</Title>
      <ButtonsContainer>
        <SizeButton
          type="button"
          onClick={() => onChange("small")}
          isSelected={selectedMarginSize === "small"}
        >
          Small
        </SizeButton>
        <SizeButton
          type="button"
          onClick={() => onChange("medium")}
          isSelected={selectedMarginSize === "medium"}
        >
          Medium
        </SizeButton>
        <SizeButton
          type="button"
          onClick={() => onChange("large")}
          isSelected={selectedMarginSize === "large"}
        >
          Large
        </SizeButton>
      </ButtonsContainer>
    </div>
  );
};

export default MarginSizeSelector;
