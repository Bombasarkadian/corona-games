import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import AuthProvider from "services/Auth";
import handleAuthorization from "utils/user/handleAuthorization";
import CredentialsLayout from "components/layout/CredentialsLayout";
import ChangePasswordForm from "components/user/forms/ChangePasswordForm";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { t } = useTranslation("credentials");
  const history = useHistory();

  const formValid = newPassword.length > 0;

  const handleChangePassword = handleAuthorization(
    () => AuthProvider.changePassword(currentPassword, newPassword),
    setError,
    setIsLoading,
    history,
    () => setSuccess(t("change_password.success"))
  );

  const modalOptions = {
    closeIcon: true,
    onClose: () => history.goBack(),
  };

  return (
    <CredentialsLayout action="change_password" modalOptions={modalOptions}>
      <ChangePasswordForm
        {...{
          handleChangePassword,
          isLoading,
          error,
          success,
          currentPassword,
          setCurrentPassword,
          newPassword,
          setNewPassword,
          formValid,
        }}
      />
    </CredentialsLayout>
  );
};

export default ChangePassword;
