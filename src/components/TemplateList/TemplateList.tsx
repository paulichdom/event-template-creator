import { TemplateListItem } from "../TemplateListItem/TemplateListItem";
import { Template } from "../../types/template";
import { List } from "@mui/material";

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
        <TemplateListItem
          key={item.id} // Assuming each template has a unique 'id'
          item={item}
          handleUseTemplate={handleUseTemplate}
          showModal={showModal}
          handleDelete={handleDelete}
        />
      ))}
    </List>
  );
}; 