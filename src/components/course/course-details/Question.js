import "../../../assets/scss/comments.scss";
import { Editor } from "@tinymce/tinymce-react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { loadCourses } from "../../../store/actions/courseActions";

import moment from "moment";
import "moment/locale/fr";

function Question(props) {
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  const token = `${process.env.REACT_APP_UDEMY_CLIENT_API}`;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState("");
  const [questionId, setQuestionId] = useState(null);
  const [replyId, setReplyId] = useState(null);
  const [questionsList, setQuestionsList] = useState(null);
  const [questionReplies, setQuestionReplies] = useState(null);
  const [reply, setReply] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_UDEMY_HOSTNAME}/taught-courses/questions/?course=${props.id}&ordering=newest/?page_size=100`,
        config
      )
      .then((res) => {
        setQuestionsList(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const openReply = (question) => {
    setOpen(true);
  };

  const openQuestion = (question) => {
    axios
      .get(
        `${process.env.REACT_APP_UDEMY_HOSTNAME}/courses/${props.id}/questions/${question}/replies/?page_size=100`,
        config
      )
      .then((res) => {
        setQuestionReplies(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
    setOpenId(question);
  };

  const handleSendReply = (e) => {
    e.stopPropagation();
    axios
      .post(
        `${process.env.REACT_APP_UDEMY_HOSTNAME}/courses/${props.id}/questions/${questionId}/replies/`,
        { body: reply },
        config
      )
      .then((res) => {
        dispatch(loadCourses);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateReply = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="row">
      <div className="col-lg-6 card mb-4">
        <div className="card-body">
          {questionsList != null ? (
            questionsList?.map((question, index) => {
              return (
                <div key={question.id}>
                  <div>
                    <div className="comment">
                      <div className="user-banner">
                        <div className="user">
                          <h5>
                            {question.title}&nbsp;
                            {question.is_read ? (
                              <i className="fa fa-circle text-secondary"></i>
                            ) : (
                              <i className="fa fa-circle text-success"></i>
                            )}
                          </h5>
                        </div>
                      </div>
                      <div
                        className="content"
                        dangerouslySetInnerHTML={{
                          __html: question.body,
                        }}
                      ></div>
                      <div className="footer">
                        <a
                          href="#"
                          onClick={(event) => {
                            event.stopPropagation();
                            openReply(question.id);
                            setReplyId(null);
                            setReply(null);
                            setQuestionId(question.id);
                            event.preventDefault();
                          }}
                        >
                          Répondre
                        </a>
                        <div className="divider"></div>
                        <span className="is-mute">
                          {moment(question.created).locale("fr").format("ll")}
                        </span>
                        <div className="divider"></div>
                        <a
                          href="#"
                          className="is-mute"
                          onClick={(event) => {
                            event.stopPropagation();
                            openQuestion(question.id);
                            event.preventDefault();
                          }}
                        >
                          {question.num_replies} réponse(s)
                        </a>
                        <div className="divider"></div>
                        <span className="is-mute">
                          {question.num_follows} follows
                        </span>
                      </div>
                    </div>
                    {openId == question.id
                      ? questionReplies?.map((replie, index) => {
                          return (
                            <div key={replie.id} className="reply comment">
                              <div className="user-banner">
                                <div className="user">
                                  <h5>
                                    {replie.user.name}&nbsp;
                                    {replie.is_top_answer != null ? (
                                      <i className="fa fa-check text-success"></i>
                                    ) : null}
                                  </h5>
                                </div>
                              </div>
                              <div
                                className="content"
                                dangerouslySetInnerHTML={{
                                  __html: replie.body,
                                }}
                              ></div>
                              <div className="footer">
                                {replie.user.id ==
                                process.env.REACT_APP_ADMIN_ID ? (
                                  <a
                                    href="#"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      openReply(replie.id);
                                      setReplyId(replie.id);
                                      setReply(replie.body);
                                      setQuestionId(replie.id);
                                      event.preventDefault();
                                    }}
                                  >
                                    Modifier
                                  </a>
                                ) : (
                                  <a
                                    href="#"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      openReply(replie.id);
                                      setReplyId(null);
                                      setReply(null);
                                      setQuestionId(replie.id);
                                      event.preventDefault();
                                    }}
                                  >
                                    Répondre
                                  </a>
                                )}
                                <div className="divider"></div>
                                <span className="is-mute">
                                  {moment(replie.created)
                                    .locale("fr")
                                    .format("ll")}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      : null}
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <tr>
              <td>Chargement...</td>
            </tr>
          )}
        </div>
      </div>

      {open ? (
        <div className="col-lg-6 card position-relative">
          <div className="card-body position-fixed">
            <Editor
              apiKey={process.env.REACT_APP_TINYMCE_CLIENT_API}
              placeholder="Hi."
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={reply !== null ? reply : ""}
              init={{
                height: 600,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | link image | code | help",
                image_title: true,
                automatic_uploads: true,
                file_picker_types: "image media",
                file_picker_callback: function (callback, value, meta) {
                  if (meta.filetype == "image") {
                    var input = document.getElementById("my-file");
                    input.click();
                    input.onchange = function () {
                      var file = input.files[0];
                      var reader = new FileReader();
                      reader.onload = function (e) {
                        callback(e.target.result, {
                          alt: file.name,
                        });
                      };
                      reader.readAsDataURL(file);
                    };
                  }
                },
                paste_data_images: true,
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onChange={(e) => {
                e.stopPropagation();
                setReply(editorRef.current.getContent());
              }}
            />
            {replyId == null ? (
              <button
                className="btn btn-primary my-3"
                onClick={handleSendReply}
              >
                Soumettre
              </button>
            ) : (
              <button
                className="btn btn-primary my-3"
                onClick={handleUpdateReply}
              >
                Modifier
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Question;
