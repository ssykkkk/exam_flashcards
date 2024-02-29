import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { withLayout } from "../app/App";
import Modal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGroups,
  editGroups,
  getGroups,
} from "../../share/reducers/groups.reducer";
import styles from "./Facts.module.scss";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { clearErrors, setError } from "../../share/reducers/errors.reducer";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { addCard, getAllCards } from "../../share/reducers/card.reducer";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

function FactsByCategory() {
  const { name } = useParams();
  const initalState = {
    id: 0,
    answer: "",
    question: "",
    group: name,
    tags: [],
  };
  const initalStateAdd = {
    id: Date.now(),
    answer: "",
    question: "",
    group: name,
    tags: [],
  };
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [inputValueEdit, setInputValueEdit] = useState(name);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [formAdd, setFormAdd] = useState(initalStateAdd);
  const [display, setDisplay] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [toDelete, setToDelete] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const flashcards = useSelector((state) => state.cards);
  const groups = useSelector((state) => state.groups);
  const error = useSelector((state) => state.error);

  // if (isOpenModalAdd || isOpenModalEdit) {
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

  const cardsByCategory = [];

  flashcards.forEach((card) => {
    if (card.group === name) {
      cardsByCategory.push(card);
    }
  });

  const editGroup = (newName) => {
    groups.forEach((item, i) => {
      if (item === name) {
        if (!groups.includes(newName)) {
          dispatch(editGroups({ index: i, newName, name }));
          setIsEdit(true);
          setTimeout(() => {
            setIsEdit(false);
          }, 2000);
        } else {
          dispatch(setError("Група вже існує!"));
          setTimeout(() => {
            dispatch(clearErrors());
          }, 2000);
        }
      }
    });
    dispatch(getAllCards());
    navigate("/group/" + newName);
  };

  const deleteGroup = () => {
    groups.forEach((item, i) => {
      if (item === name) {
        dispatch(deleteGroups({ i, name }));
      }
    });
    navigate("/group");
  };

  const addFact = (fact) => {
    dispatch(addCard(fact));
    setFormAdd(initalState);
    setTimeout(() => {
      setFormAdd(initalStateAdd);
    }, 2000);
  };

  return (
    <div className="container">
      <div className={styles.wrap}>
        <h3>
          Група <span style={{ textTransform: "uppercase" }}>{name}</span>{" "}
        </h3>
        <div className={styles.butts}>
          <button onClick={() => setIsOpenModalEdit(true)}>
            <FaRegEdit /> <span>Редагувати</span>
          </button>
          <button
            onClick={() => {
              setIsOpenModalAdd(true);
              setFormAdd(initalStateAdd);
            }}
          >
            <MdOutlineAddCircleOutline /> <span>Додати факт</span>
          </button>
        </div>
        <ul>
          {cardsByCategory.length !== 0 &&
            cardsByCategory.map((item, i) => (
              <li key={i}>
                <div className={styles.question}>
                  <span>{item.question}</span>
                  <span
                    onClick={() =>
                      setDisplay((prev) => ({ ...prev, [i]: !prev[i] }))
                    }
                  >
                    {display[i] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                  </span>
                </div>
                {display[i] && (
                  <div className={styles.hide}>
                    <div className={styles.answer}>
                      <span style={{ fontWeight: "900" }}>Відповідь:</span>
                      <span>{item.answer}</span>
                    </div>
                    <ul className={styles.tags}>
                      {item.tags.map((tag, index) => (
                        <li key={index}>
                          <i>#{tag}</i>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
        </ul>
        {cardsByCategory.length === 0 && (
          <div className={styles.noCard}>В групі немає карток</div>
        )}
      </div>
      <Modal
        isModalOpen={isOpenModalEdit}
        openModal={() => {setIsOpenModalEdit(false); setToDelete(false); setInputValueEdit(name)}}
      >
        {!isEdit && !toDelete && (
          <form
            className={styles.formEdit}
            onSubmit={(e) => {
              editGroup(inputValueEdit);
              e.preventDefault();
            }}
          >
            <h3>Редагувати групу</h3>
            <input
              type="text"
              value={inputValueEdit}
              onChange={(e) => setInputValueEdit(e.target.value)}
              placeholder="Введіть назву групи"
              required
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button type="submit">
              <MdModeEdit /> <span>Змінити назву</span>
            </button>
            <button className={styles.del} onClick={() => setToDelete(true)}>
              <FaRegTrashAlt />
              <span>Видалити</span>
            </button>
          </form>
        )}
        {isEdit && <span className={styles.succsess}>Назву змінено</span>}
        {toDelete && (
          <div className={styles.formEdit}>
            <span>Ви впевнені що хочете видалити групу разом з усіма її картками?</span>
            <div className={styles.delete}>
            <button className={styles.del} onClick={() => deleteGroup()}>
              <FaRegTrashAlt />
              <span>Так</span>
            </button>
            <button onClick={()=> setToDelete(false)}>Ні</button>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        isModalOpen={isOpenModalAdd}
        openModal={() => setIsOpenModalAdd(false)}
      >
        {formAdd.id !== 0 && (
          <form
            onSubmit={(e) => {
              addFact(formAdd);
              e.preventDefault();
            }}
            className={styles.formEdit}
          >
            <h3>Додати факт</h3>
            <input
              type="text"
              placeholder="Введіть питання"
              onChange={(e) =>
                setFormAdd({ ...formAdd, question: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Введіть відповідь"
              onChange={(e) =>
                setFormAdd({ ...formAdd, answer: e.target.value })
              }
              required
            />
            <input
              style={{
                cursor: "not-allowed",
                textTransform: "capitalize",
                opacity: "0.5",
              }}
              value={name}
              disabled
            />

            <input
              type="text"
              placeholder="Введіть теги (через ' , ' !!!)"
              onChange={(e) =>
                setFormAdd({ ...formAdd, tags: e.target.value.split(",") })
              }
              required
            />
            <button type="submit">
              <IoMdAdd /> <span>Додати</span>
            </button>
          </form>
        )}
        {formAdd.id === 0 && (
          <span className={styles.succsess}>Факт додано</span>
        )}
      </Modal>
    </div>
  );
}

export default withLayout(FactsByCategory);
