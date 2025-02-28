import React from "react";
import styled from "styled-components";

interface SkillsProps {
  skillsData: string[];
  setSkillsData: (data: string[]) => void;
}

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.divider};
  border-radius: ${(props) => props.theme.borderRadius.md};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.primary.light}40;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SkillTag = styled.div`
  background-color: ${(props) => props.theme.colors.blue[100]};
  color: ${(props) => props.theme.colors.blue[800]};
  padding: 0.25rem 0.75rem;
  border-radius: ${(props) => props.theme.borderRadius.full};
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.button`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.colors.blue[600]};
  background: none;
  border: none;
  padding: 0;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.blue[800]};
  }
`;

const Skills: React.FC<SkillsProps> = ({ skillsData, setSkillsData }) => {
  const handleSkillInput = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      e.preventDefault();
      setSkillsData([...skillsData, e.currentTarget.value.trim()]);
      e.currentTarget.value = "";
    }
  };

  const removeSkill = (indexToRemove: number): void => {
    setSkillsData(skillsData.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <FormGroup>
        <Label>Add skills (press Enter after each skill)</Label>
        <Input
          type="text"
          onKeyDown={handleSkillInput}
          placeholder="JavaScript, React, Node.js"
        />
      </FormGroup>

      <SkillsContainer>
        {skillsData.map((skill, index) => (
          <SkillTag key={index}>
            <span>{skill}</span>
            <RemoveButton
              onClick={() => removeSkill(index)}
              type="button"
              aria-label="Remove skill"
            >
              ×
            </RemoveButton>
          </SkillTag>
        ))}
      </SkillsContainer>
    </div>
  );
};

export default Skills;
