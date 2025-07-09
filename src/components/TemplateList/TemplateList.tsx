import { Template } from "../../types/template";
import { List } from "@mui/material";
import { TemplateCard } from "../TemplateCard/TemplateCard";

interface TemplateListProps {
  mockTemplates: Template[];
  handleUseTemplate: (template: Template) => void;
  showModal: (template: Template) => void;
  handleDelete: (id: string) => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({
  mockTemplates,
  handleUseTemplate,
  showModal,
  handleDelete,
}) => {
  return (
    <List>
      {mockTemplates.map((item) => (
        <TemplateCard
          key={item.id}
          item={item}
          handleUseTemplate={handleUseTemplate}
          showModal={showModal}
          handleDelete={handleDelete}
        />
      ))}
    </List>
  );
};
