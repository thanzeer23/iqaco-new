import { CToast, CToastBody, CToastClose } from "@coreui/react";
const showToast = (message, color) => {
  return (
    <CToast
      autohide={true}
      visible={true}
      color={color}
      delay={2000}
      className="text-white align-items-center"
    >
      <div className="d-flex">
        <CToastBody>{message}.</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  );
};

export default showToast;
