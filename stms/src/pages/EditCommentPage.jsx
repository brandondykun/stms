import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import apiCalls from "../api/apiUtils";
import { useNavigate } from "react-router-dom";
import CommentForm from "../components/CommentForm";

const formTemplate = {
  category: "",
  commentor_id: "",
  text: "",
  timestamp: "",
  user_id: "",
};

const EditComment = () => {
  const [formInputs, setFormInputs] = useState(formTemplate);
  const { id, cid } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    apiCalls.getComment(cid).then((res) => {
      if (!res.error) {
        setFormInputs(res);
      }
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    apiCalls
      .editComment(cid, formInputs)
      .then((res) => {
        if (res.status === 200) {
          navigate(`/comments/${id}`);
        }
      })
      .catch((error) => console.error(error));
    // need to handle this error
  };

  return (
    <div className="primary-content">
      <h1 className="page-title name-title">Edit Comment</h1>
      <CommentForm
        formInputs={formInputs}
        setFormInputs={setFormInputs}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditComment;
