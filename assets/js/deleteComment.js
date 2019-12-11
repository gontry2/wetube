import axios from "axios";
import { parseExpression } from "babylon";
import { prototype } from "events";

const commentNum = document.getElementById("jsCommentNumber");
const commentList = document.getElementById("jsCommentList");
const delBtnArr = commentList.getElementsByClassName("comment__delete");

const decreaseNumber = () => {
    commentNum.innerHTML = parseInt(commentNum.innerHTML, 10) - 1;
};

const handleDeleteComment = async event => {
    const videoId = window.location.href.split("/videos/")[1];
    const targetLi = event.target.parentNode.parentNode;
    const commentId = event.target.id;
    commentList.removeChild(targetLi);

    const response = await axios({
        url: `/api/${commentId}/deleteComment`,
        method: "POST",
        data: {
            videoId
        }
    });
    if (response.status === 200) {
        decreaseNumber();
    }
};

const init = () => {
    Array.prototype.forEach.call(delBtnArr, function(delBtn) {
        delBtn.addEventListener("click", handleDeleteComment);
    });
};

if (commentList) {
    init();
}