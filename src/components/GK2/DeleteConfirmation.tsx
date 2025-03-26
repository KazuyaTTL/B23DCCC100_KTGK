import React from "react";
import { Popconfirm, Button } from "antd";

interface DeleteConfirmationProps {
  onConfirm: () => void;
  disabled: boolean;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm, disabled }) => {
  return (
    <Popconfirm
      title="Bạn có chắc chắn muốn xóa khóa học này?"
      onConfirm={onConfirm}
      okText="Có"
      cancelText="Không"
      disabled={disabled}
    >
      <Button danger disabled={disabled}>
        Xóa
      </Button>
    </Popconfirm>
  );
};

export default DeleteConfirmation;