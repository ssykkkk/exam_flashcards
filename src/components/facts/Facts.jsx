import React, { useEffect, useState } from "react";
import { withLayout } from "../app/App";
import Modal from "../modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../share/reducers/groups.reducer";
import {
  addCard,
  deleteCard,
  editCard,
  getAllCards,
} from "../../share/reducers/card.reducer";
import styles from "./Facts.module.scss";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";

function Facts() {
  const initalState = { id: 0, answer: "", question: "", group: "", tags: [] };
  const initalStateEdit = {
    id: -1,
    answer: "",
    question: "",
    group: "",
    tags: [],
  };
  const initalStateAdd = {
    id: Date.now(),
    answer: "",
    question: "",
    group: "",
    tags: [],
  };
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [formAdd, setFormAdd] = useState(initalStateAdd);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [formEdit, setFormEdit] = useState(initalState);
  const [tag, setTag] = useState("");
  const [cardsByTag, setСardsByTag] = useState([]);
  const [display, setDisplay] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCards());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getGroups());
  }, [dispatch]);

  const flashcards = useSelector((state) => state.cards);
  const groups = useSelector((state) => state.groups);

  // if (isOpenModalAdd || isOpenModalEdit) {
  //   document.body.style.overflow = "hidden";
  // } else {
  //   document.body.style.overflow = "auto";
  // }

  const editFact = (fact) => {
    flashcards.forEach((card, i) => {
      if (card.id === fact.id) {
        dispatch(editCard({ i, fact }));
        setFormEdit(initalStateEdit);
        setTimeout(() => {
          setFormEdit(fact);
        }, 2000);
      }
    });
  };
  const deleteFact = (fact) => {
    flashcards.forEach((card, i) => {
      if (card.id === fact.id) {
        console.log(card.id, fact.id, i);
        dispatch(deleteCard(i));
        setFormEdit(initalState);
        setTimeout(() => {
          setIsOpenModalEdit(false);
        }, 2000);
      }
    });
  };
  const addFact = (fact) => {
    dispatch(addCard(fact));
    setFormAdd(initalState);
    setTimeout(() => {
      setFormAdd(initalStateAdd);
    }, 2000);
  };
  const searchByTag = (tag) => {
    const arr = [];
    flashcards.forEach((card) => {
      card.tags.forEach((item) => {
        if (item.toLowerCase().includes(tag.toLowerCase())) {
          arr.push(card);
        }
      });
    });
    setСardsByTag(arr);
  };

  return (
    <>
      <div className="container">
        <div className={styles.wrap}>
        <h3>
          Усі картки
        </h3>
        <div className={styles.butts}>
          <div className={styles.search}>
            <label htmlFor="tag"> Пошук за тегом: </label>
          <input
            type="text"
            id="tag"
            value={tag}
            onInput={(e) => {
              setTag(e.target.value);
              searchByTag(e.target.value);
            }}
          />
          </div>
            <button
            onClick={() => {
              setIsOpenModalAdd(true);
              setFormAdd(initalStateAdd);
            }}
          >
            <MdOutlineAddCircleOutline />
            <span>Додати факт</span>
          </button>
          </div>
          <ul >
            {tag === "" &&
              flashcards.map((item, i) => (
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
                  <button
                    onClick={() => {
                      setIsOpenModalEdit(true);
                      setFormEdit(item);
                    }}
                    className={styles.editButt}
                  >
                    <FaRegEdit />
                  </button>
                </li>
              ))}
            {tag !== "" &&
              cardsByTag.map((item, i) => (
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
                  <button
                    onClick={() => {
                      setIsOpenModalEdit(true);
                      setFormEdit(item);
                    }}
                    className={styles.editButt}
                  >
                    <FaRegEdit />
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Modal
        isModalOpen={isOpenModalEdit}
        openModal={() => setIsOpenModalEdit(false)}
      >
        {formEdit.id !== 0 && formEdit.id !== -1 && (
          <form
            onSubmit={(e) => {
              editFact(formEdit);
              e.preventDefault();
            }}
            className={styles.formEdit}
          >
            <h3>Змінити факт</h3>
            <input
              type="text"
              value={formEdit.question}
              placeholder="Введіть запитання"
              onChange={(e) =>
                setFormEdit({ ...formEdit, question: e.target.value })
              }
              required
            />
            <input
              type="text"
              value={formEdit.answer}
              placeholder="Введіть відповідь"
              onChange={(e) =>
                setFormEdit({ ...formEdit, answer: e.target.value })
              }
              required
            />
            <select
              onChange={(e) =>
                setFormEdit({ ...formEdit, group: e.target.value })
              }
              required
            >
              <option value={formEdit.group}>{formEdit.group}</option>
              {groups.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={formEdit.tags}
              placeholder="Введіть теги (через ' , ' !!!)"
              onChange={(e) =>
                setFormEdit({ ...formEdit, tags: e.target.value.split(",") })
              }
              required
            />
            <button type="submit">
              <MdModeEdit /> <span>Змінити картку</span>
            </button>
            <button className={styles.del} onClick={() => deleteFact(formEdit)}>
              <FaRegTrashAlt />
              <span>Видалити</span>
            </button>
          </form>
        )}
        {formEdit.id === 0 && (
          <span className={styles.succsess}>Картку видалено</span>
        )}
        {formEdit.id === -1 && (
          <span className={styles.succsess}>Картку змінено</span>
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
              placeholder="Введіть запитання"
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
            <select
              onChange={(e) =>
                setFormAdd({ ...formAdd, group: e.target.value })
              }
              required
            >
              <option value="">Виберіть групу</option>
              {groups.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Введіть теги (через ' , ' !!!)"
              onChange={(e) =>
                setFormAdd({ ...formAdd, tags: e.target.value.split(",") })
              }
              required
            />
            <button type="submit"> <IoMdAdd /> <span>Додати</span></button>
          </form>
        )}
        {formAdd.id === 0 && <span>Факт додано</span>}
      </Modal>
    </>
  );
}
export default withLayout(Facts);
