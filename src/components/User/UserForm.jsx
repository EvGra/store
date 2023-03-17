import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { toggleForm, toggleFormType } from "../../features/user/userSlice";
import styles from "../../styles/User.module.css";
import { UserLogin } from "./UserLogin";
import { UserSignUp } from "./UserSignUp";

export const UserForm = () => {
  const { showForm, formType } = useSelector(({ user }) => user);

  const dispatch = useDispatch();

  const closeForm = () => dispatch(toggleForm(false));
  const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));

  return (
    showForm && (
      <>
        <div className={styles.overlay} onClick={closeForm} />
        {formType === "signup" ? (
          <UserSignUp
            closeForm={closeForm}
            toggleCurrentFormType={toggleCurrentFormType}
          />
        ) : (
          <UserLogin
            closeForm={closeForm}
            toggleCurrentFormType={toggleCurrentFormType}
          />
        )}
      </>
    )
  );
};
