import React from "react";
import { PersonalInfo as PersonalInfoType } from "../../types/resume";
import { FormGroup, Label, Input, Grid } from "../Common";
import TemplateAwareRichTextEditor from "../Common/TemplateAwareRichTextEditor";

interface PersonalInfoProps {
  personalData: PersonalInfoType;
  setPersonalData: (data: PersonalInfoType) => void;
  useTemplateStyles?: boolean;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  personalData,
  setPersonalData,
  useTemplateStyles = false,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setPersonalData({
      ...personalData,
      [name]: value,
    });
  };

  const handleRichTextChange =
    (field: keyof PersonalInfoType) =>
    (value: string): void => {
      setPersonalData({
        ...personalData,
        [field]: value,
      });
    };

  return (
    <div>
      <FormGroup>
        <Label>Full Name</Label>
        <Input
          type="text"
          name="name"
          value={personalData.name}
          onChange={handleChange}
          placeholder="Jane Doe"
        />
      </FormGroup>

      <FormGroup>
        <Label>Professional Title</Label>
        <Input
          type="text"
          name="title"
          value={personalData.title}
          onChange={handleChange}
          placeholder="Software Engineer"
        />
      </FormGroup>

      <Grid cols={1} $gap={4}>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={personalData.email}
            onChange={handleChange}
            placeholder="jane.doe@example.com"
          />
        </FormGroup>
        <FormGroup>
          <Label>Phone</Label>
          <Input
            type="tel"
            name="phone"
            value={personalData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
          />
        </FormGroup>
      </Grid>

      <FormGroup>
        <Label>Location</Label>
        <Input
          type="text"
          name="location"
          value={personalData.location}
          onChange={handleChange}
          placeholder="San Francisco, CA"
        />
      </FormGroup>

      <FormGroup>
        <Label>Professional Summary</Label>
        <TemplateAwareRichTextEditor
          value={personalData.summary}
          onChange={handleRichTextChange("summary")}
          placeholder="Experienced software engineer with a passion for developing innovative solutions..."
          minHeight="120px"
          contentType="summary"
          useTemplateDefaults={useTemplateStyles}
        />
      </FormGroup>
    </div>
  );
};

export default PersonalInfo;
