import { Button, Popconfirm, List } from "antd";
import { RocketOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Template } from "../../types/template";

interface TemplateListItemProps {
  item: Template;
  handleUseTemplate: (template: Template) => void;
  showModal: (template: Template) => void;
  handleDelete: (id: string) => void;
}

export const TemplateListItem: React.FC<TemplateListItemProps> = ({
  item,
  handleUseTemplate,
  showModal,
  handleDelete,
}) => {
  return (
    <List.Item
      actions={[
        <Button
          title="Use Template"
          type="text"
          shape="circle"
          icon={<RocketOutlined />}
          onClick={() => handleUseTemplate(item)}
        />,
        <Button
          title="Edit Template"
          type="text"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => showModal(item)}
        />,
        <Popconfirm
          title="Delete this template?"
          onConfirm={() => handleDelete(item.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            title="Delete Template"
            type="text"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </Popconfirm>,
      ]}
    >
      <List.Item.Meta title={item.templateName} />
    </List.Item>
  );
}; 