import { List } from "antd";
import { TemplateListItem } from "../TemplateListItem/TemplateListItem";
import { Template } from "../../types/template";

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
    <List
      itemLayout="horizontal"
      dataSource={mockTemplates}
      renderItem={(item) => (
        <TemplateListItem
          item={item}
          handleUseTemplate={handleUseTemplate}
          showModal={showModal}
          handleDelete={handleDelete}
        />
      )}
    />
  );
}; 