import React from "react";
import styled from "styled-components";
import { EducationItem } from "../../types/resume";
import { FormGroup, Label, Input, Button, Grid } from "../Common";

interface EducationProps {
  educationData: EducationItem[];
  setEducationData: (data: EducationItem[]) => void;
}

const EducationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const EducationTitle = styled.h3`
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

const EducationItemWrapper = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.divider};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const AddButton = styled(Button)`
  margin-top: 1rem;
`;

const Education: React.FC<EducationProps> = ({
  educationData,
  setEducationData,
}) => {
  const handleEducationChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    const updatedEducation = [...educationData];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [name]: value,
    };

    setEducationData(updatedEducation);
  };

  const addEducation = (): void => {
    setEducationData([
      ...educationData,
      {
        institution: "",
        degree: "",
        field: "",
        graduationDate: "",
        gpa: "",
      },
    ]);
  };

  const removeEducation = (index: number): void => {
    const updatedEducation = [...educationData];
    updatedEducation.splice(index, 1);
    setEducationData(updatedEducation);
  };

  return (
    <div>
      {educationData.map((edu, index) => (
        <EducationItemWrapper key={index}>
          <EducationHeader>
            <EducationTitle>Education {index + 1}</EducationTitle>
            {educationData.length > 1 && (
              <RemoveButton
                onClick={() => removeEducation(index)}
                type="button"
              >
                Remove
              </RemoveButton>
            )}
          </EducationHeader>

          <FormGroup>
            <Label>Institution</Label>
            <Input
              type="text"
              name="institution"
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="University of Example"
            />
          </FormGroup>

          <Grid cols={1} gap={4}>
            <FormGroup>
              <Label>Degree</Label>
              <Input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Bachelor of Science"
              />
            </FormGroup>

            <FormGroup>
              <Label>Field of Study</Label>
              <Input
                type="text"
                name="field"
                value={edu.field}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="Computer Science"
              />
            </FormGroup>
          </Grid>

          <Grid cols={1} gap={4}>
            <FormGroup>
              <Label>Graduation Date</Label>
              <Input
                type="text"
                name="graduationDate"
                value={edu.graduationDate}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="May 2018"
              />
            </FormGroup>

            <FormGroup>
              <Label>GPA (optional)</Label>
              <Input
                type="text"
                name="gpa"
                value={edu.gpa}
                onChange={(e) => handleEducationChange(index, e)}
                placeholder="3.8/4.0"
              />
            </FormGroup>
          </Grid>
        </EducationItemWrapper>
      ))}

      <AddButton onClick={addEducation} variant="primary">
        Add Education
      </AddButton>
    </div>
  );
};

export default Education;
