import React, { useState } from "react";
import styled from "styled-components";

interface CollapsibleSectionProps {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

const SectionContainer = styled.div`
  margin-bottom: 1.5rem;
  background-color: ${(props) => props.theme.colors.background.paper};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.md};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray[50]};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${(props) => props.theme.typography.fontSize.xl};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  color: ${(props) => props.theme.colors.text.primary};
  margin: 0;
`;

const ToggleIcon = styled.span<{ isExpanded: boolean }>`
  font-size: 1.25rem;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isExpanded ? "rotate(180deg)" : "rotate(0)")};
  display: inline-block;
  color: ${(props) => props.theme.colors.text.secondary};
`;

interface ContentProps {
  isExpanded: boolean;
}

const Content = styled.div<ContentProps>`
  padding: ${(props) => (props.isExpanded ? "1.5rem" : "0")};
  max-height: ${(props) => (props.isExpanded ? "10000px" : "0")};
  overflow: hidden;
  transition: max-height 0.5s ease, padding 0.3s ease;
  border-top: ${(props) =>
    props.isExpanded ? `1px solid ${props.theme.colors.divider}` : "none"};
`;

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  defaultExpanded = false,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SectionContainer>
      <SectionHeader onClick={toggleExpanded}>
        <SectionTitle>{title}</SectionTitle>
        <ToggleIcon isExpanded={isExpanded}>▼</ToggleIcon>
      </SectionHeader>
      <Content isExpanded={isExpanded}>{children}</Content>
    </SectionContainer>
  );
};

export default CollapsibleSection;
