import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/user/userSlice";

import styles from "../../styles/Profile.module.css";

export const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isNotEmpty = Object.values(values).some((val) => val);

    if (!isNotEmpty) return;

    dispatch(updateUser(values));
  };

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to login</span>
      ) : (
        <form className={styles.form}>
          <div className={styles.group}>
            <input
              type="email"
              placeholder="Your email"
              name="email"
              value={values.email}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="name"
              placeholder="Your name"
              name="name"
              value={values.name}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              value={values.password}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.group}>
            <input
              type="avatar"
              placeholder="Your avatar"
              name="avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>

          <div
            className={styles.link}
            onClick={() => toggleCurrentFormType("login")}
          >
            I already have an account
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.submit}
          >
            Update
          </button>
        </form>
      )}
    </section>
  );
};
