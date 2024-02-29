import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withLayout } from "../app/App";
import styles from "./Group.module.scss";
import Modal from "../modal/Modal";
import { getGroups, addGroups } from "../../share/reducers/groups.reducer";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, setError } from "../../share/reducers/errors.reducer";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { getAllCards } from "../../share/reducers/card.reducer";
import { IoMdAdd } from "react-icons/io";

function Group() {
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [inputValueAdd, setInputValueAdd] = useState("");
  const [succsess, setSuccsess] = useState(false);
  const dispatch = useDispatch();

  const error = useSelector((state) => state.error);
  // if (isOpenModalAdd) {
  //   document.body.style.overflow = "hidden";
  // } else {
  //   document.body.style.overflow = "auto";
  // }

  useEffect(() => {
    dispatch(getAllCards());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  const groups = useSelector((state) => state.groups);

  const addGroup = (group) => {
    if (!groups.includes(group)) {
      dispatch(addGroups(group));
      setInputValueAdd("");
      setSuccsess(true);
      setTimeout(() => {
        setSuccsess(false);
      }, 2000);
    } else {
      dispatch(setError("Група вже існує!"));
      setTimeout(() => {
        dispatch(clearErrors());
      }, 2000);
    }
  };

  return (
    <div className="container">
      <div className={styles.wrap}>
        <button onClick={() => setIsOpenModalAdd(true)}>
          <MdOutlineAddCircleOutline /> <span>Додати групу</span>
        </button>
        <h1>Групи фактів</h1>
        <ul>
          {groups.map((item, i) => (
            <li key={i}>
              <Link to={"/group/" + item}>{item}</Link>
              <Link to={"/group/" + item + "/train"}>
                <FaRegCirclePlay />
                <span>Тренуватись</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Modal
        isModalOpen={isOpenModalAdd}
        openModal={() => {setIsOpenModalAdd(false); setInputValueAdd("")}}
      >
        <form
          className={styles.formModal}
          onSubmit={(e) => {
            addGroup(inputValueAdd);
            e.preventDefault();
          }}
        >
          <h3>Додати групу</h3>
          <input
            type="text"
            placeholder="Введіть назву групи"
            value={inputValueAdd}
            onChange={(e) => setInputValueAdd(e.target.value)}
            required
          />
          {succsess && <div style={{ color: "green" }}>Групу додано!</div>}
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit"> <IoMdAdd /> <span>Додати</span></button>
        </form>
      </Modal>
    </div>
  );
}
export default withLayout(Group);
