import React, { useState, useRef } from "react";
import styled from "styled-components";
import { TEMPLATES_LIST } from "../templates";
import TemplatePreviewCard from "./TemplatePreviewCard";
import { TemplateId } from "../../types/resume";
import { Card, CardTitle } from "../Common";

interface TemplateSelectorProps {
  selectedTemplate: TemplateId;
  onSelectTemplate: (templateId: TemplateId) => void;
}

const CarouselContainer = styled.div`
  position: relative;
  margin: 0 -0.5rem;
  padding: 0 0.5rem;

  ${(props) => props.theme.media.md} {
    margin: 0 -1rem;
    padding: 0 1rem;
  }
`;

const CarouselTrack = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding: 1rem 0;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

interface TemplateCardProps {
  $isSelected: boolean;
}

const TemplateCard = styled.div<TemplateCardProps>`
  flex: 0 0 auto;
  width: calc(50% - 1rem);
  min-width: 220px;
  border: 1px solid
    ${(props) =>
      props.$isSelected
        ? props.theme.colors.primary.main
        : props.theme.colors.gray[200]};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${(props) =>
    props.$isSelected ? props.theme.colors.blue[50] : "transparent"};
  margin-right: 1rem;

  ${(props) =>
    props.$isSelected &&
    `
    box-shadow: 0 0 0 2px ${props.theme.colors.blue[200]};
  `}

  &:hover {
    border-color: ${(props) =>
      props.$isSelected
        ? props.theme.colors.primary.main
        : props.theme.colors.blue[300]};
    background-color: ${(props) =>
      props.$isSelected
        ? props.theme.colors.blue[50]
        : props.theme.colors.blue[50]};
    box-shadow: ${(props) =>
      props.$isSelected
        ? `0 0 0 2px ${props.theme.colors.blue[200]}`
        : props.theme.shadows.md};
  }

  &:last-child {
    margin-right: 0;
  }

  ${(props) => props.theme.media.md} {
    width: calc(50% - 1rem);
  }

  ${(props) => props.theme.media.lg} {
    width: calc(50% - 1rem);
  }
`;

const TemplateCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const TemplateTitle = styled.h3`
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
`;

const SelectedBadge = styled.span`
  background-color: ${(props) => props.theme.colors.primary.main};
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.typography.fontSize.xs};
  padding: 0.25rem 0.5rem;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const PreviewContainer = styled.div`
  height: 6rem;
  border: 1px solid ${(props) => props.theme.colors.gray[200]};
  border-radius: ${(props) => props.theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: 0.75rem;
`;

const TemplateDescription = styled.p`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  color: ${(props) => props.theme.colors.text.primary};
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: ${(props) => props.theme.shadows.md};
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray[100]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(CarouselButton)`
  left: 0;

  ${(props) => props.theme.media.sm} {
    left: 0.25rem;
  }
`;

const NextButton = styled(CarouselButton)`
  right: 0;

  ${(props) => props.theme.media.sm} {
    right: 0.25rem;
  }
`;

const ScrollIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const ScrollDot = styled.button<{ $isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$isActive
      ? props.theme.colors.primary.main
      : props.theme.colors.gray[300]};
  margin: 0 4px;
  padding: 0;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.$isActive
        ? props.theme.colors.primary.dark
        : props.theme.colors.gray[400]};
  }
`;

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const templatesPerView = 2; // Show 2 templates at once

  const scrollToNext = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setActiveDot((prev) =>
        Math.min(
          prev + 1,
          Math.ceil(TEMPLATES_LIST.length / templatesPerView) - 1
        )
      );
    }
  };

  const scrollToPrev = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setActiveDot((prev) => Math.max(prev - 1, 0));
    }
  };

  const scrollToDot = (index: number) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollTo({
        left: index * scrollAmount,
        behavior: "smooth",
      });
      setActiveDot(index);
    }
  };

  const totalDots = Math.ceil(TEMPLATES_LIST.length / templatesPerView);

  return (
    <Card>
      <CardTitle>Choose a Template</CardTitle>

      <CarouselContainer>
        <PrevButton
          onClick={scrollToPrev}
          disabled={activeDot === 0}
          aria-label="Previous templates"
        >
          ←
        </PrevButton>

        <CarouselTrack ref={carouselRef}>
          {TEMPLATES_LIST.map((template) => (
            <TemplateCard
              key={template.id}
              $isSelected={selectedTemplate === template.id}
              onClick={() => onSelectTemplate(template.id)}
            >
              <TemplateCardHeader>
                <TemplateTitle>{template.name}</TemplateTitle>
                {selectedTemplate === template.id && (
                  <SelectedBadge>Selected</SelectedBadge>
                )}
              </TemplateCardHeader>

              <PreviewContainer>
                <TemplatePreviewCard templateId={template.id} />
              </PreviewContainer>

              <TemplateDescription>{template.description}</TemplateDescription>
            </TemplateCard>
          ))}
        </CarouselTrack>

        <NextButton
          onClick={scrollToNext}
          disabled={activeDot === totalDots - 1}
          aria-label="Next templates"
        >
          →
        </NextButton>
      </CarouselContainer>

      {totalDots > 1 && (
        <ScrollIndicator>
          {Array.from({ length: totalDots }).map((_, index) => (
            <ScrollDot
              key={index}
              $isActive={index === activeDot}
              onClick={() => scrollToDot(index)}
              aria-label={`Go to template group ${index + 1}`}
            />
          ))}
        </ScrollIndicator>
      )}
    </Card>
  );
};

export default TemplateSelector;
