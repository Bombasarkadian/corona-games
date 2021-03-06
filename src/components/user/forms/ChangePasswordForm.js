/* eslint-disable react/prop-types */
import React from "react";
import { Form, Message } from "semantic-ui-react";
import { withTranslation } from "react-i18next";

const ChangePasswordForm = ({
  t,
  handleChangePassword,
  isLoading,
  error,
  success,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  formValid,
}) => (
  <Form onSubmit={handleChangePassword} loading={isLoading} error={!!error} success={!!success}>
    <Message error content={error} />
    <Message success content={success} />
    <Form.Input
      autoFocus
      placeholder={t("form.password")}
      label={t("form.password")}
      type="password"
      autoComplete="current-password"
      name={t("form.password")}
      value={currentPassword}
      onChange={(_, { value }) => setCurrentPassword(value)}
    />
    <Form.Input
      placeholder={t("form.new_password")}
      label={t("form.new_password")}
      type="password"
      autoComplete="new-password"
      name={t("form.new_password")}
      value={newPassword}
      onChange={(_, { value }) => setNewPassword(value)}
    />
    <Form.Group>
      <Form.Button disabled={!formValid} color="green" content={t("actions.change_password")} />
    </Form.Group>
  </Form>
);

export default withTranslation("credentials")(ChangePasswordForm);
