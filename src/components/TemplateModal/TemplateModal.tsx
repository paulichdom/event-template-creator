import { Modal, Button } from "antd";
import React from "react";

interface TemplateModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  children: React.ReactNode;
  form: any;
}

export const TemplateModal: React.FC<TemplateModalProps> = ({
  isModalVisible,
  handleCancel,
  children,
  form,
}) => {
  return (
    <Modal
      title="Create/Edit Template"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Save
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};
