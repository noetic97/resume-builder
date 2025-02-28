import React from "react";
import styled from "styled-components";
import { ExperienceItem } from "../../types/resume";
import {
  FormGroup,
  Label,
  Input,
  Textarea,
  Checkbox,
  Button,
  Grid,
} from "../Common";

interface ExperienceProps {
  experienceData: ExperienceItem[];
  setExperienceData: (data: ExperienceItem[]) => void;
}

const ExperienceItemWrapper = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.divider};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.25rem;
`;

const CheckboxLabel = styled.label`
  font-size: ${(props) => props.theme.typography.fontSize.sm};
  color: ${(props) => props.theme.colors.text.secondary};
`;

const AddButton = styled(Button)`
  margin-top: 1rem;
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ExperienceTitle = styled.h3`
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
`;

const RemoveButton = styled.button`
  color: ${(props) => props.theme.colors.error.main};
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.error.dark};
  }
`;

const Experience: React.FC<ExperienceProps> = ({
  experienceData,
  setExperienceData,
}) => {
  const handleExperienceChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const newValue = type === "checkbox" ? checked : value;

    const updatedExperience = [...experienceData];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [name]: newValue,
    };

    // If current position is checked, clear the end date
    if (name === "isCurrentPosition" && checked) {
      updatedExperience[index].endDate = "";
    }

    setExperienceData(updatedExperience);
  };

  const addExperience = (): void => {
    setExperienceData([
      ...experienceData,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        isCurrentPosition: false,
      },
    ]);
  };

  const removeExperience = (index: number): void => {
    const updatedExperience = [...experienceData];
    updatedExperience.splice(index, 1);
    setExperienceData(updatedExperience);
  };

  return (
    <div>
      {experienceData.map((exp, index) => (
        <ExperienceItemWrapper key={index}>
          <ExperienceHeader>
            <ExperienceTitle>Position {index + 1}</ExperienceTitle>
            {experienceData.length > 1 && (
              <RemoveButton
                onClick={() => removeExperience(index)}
                type="button"
              >
                Remove
              </RemoveButton>
            )}
          </ExperienceHeader>

          <FormGroup>
            <Label>Company</Label>
            <Input
              type="text"
              name="company"
              value={exp.company}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Acme Corp"
            />
          </FormGroup>

          <FormGroup>
            <Label>Position</Label>
            <Input
              type="text"
              name="position"
              value={exp.position}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Senior Developer"
            />
          </FormGroup>

          <Grid cols={1} gap={4}>
            <FormGroup>
              <Label>Start Date</Label>
              <Input
                type="text"
                name="startDate"
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Jan 2020"
              />
            </FormGroup>

            <FormGroup>
              <Label>End Date</Label>
              <Input
                type="text"
                name="endDate"
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(index, e)}
                placeholder="Present"
                disabled={exp.isCurrentPosition}
              />
              <CheckboxWrapper>
                <Checkbox
                  name="isCurrentPosition"
                  checked={exp.isCurrentPosition}
                  onChange={(e) => handleExperienceChange(index, e)}
                />
                <CheckboxLabel>Current Position</CheckboxLabel>
              </CheckboxWrapper>
            </FormGroup>
          </Grid>

          <FormGroup>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={exp.description}
              onChange={(e) => handleExperienceChange(index, e)}
              rows={4}
              placeholder="• Led development of a new feature that increased user engagement by 25%
• Managed a team of 5 developers"
            />
          </FormGroup>
        </ExperienceItemWrapper>
      ))}

      <AddButton onClick={addExperience} variant="primary">
        Add Experience
      </AddButton>
    </div>
  );
};

export default Experience;
