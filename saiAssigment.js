let comments = [];
let marginFirst = 20;

function Comment(content, parentId = null, marginFirst) {
    this.id = comments.length + 1;
    this.content = content;
    this.parentId = parentId;
    this.upvotes = 0;
    this.downvotes = 0;
    this.score = 0;
    this.timestamp = new Date().getTime();
    this.marginFirst = marginFirst
    this.replies = [];

    this.updateScore = function() {
        this.score = this.upvotes - this.downvotes;
    };
}

function addNewComment() {
    const content = document.getElementById("new-comment").value;
    if (content.trim() === "") {
        alert("Comment cannot be empty!");
        return;
    }

    const newComment = new Comment(content);

    comments.push(newComment);
    renderComments();
    document.getElementById("new-comment").value = "";
}

function addReply(parentId) {
    const replyContent = prompt("Reply to this comment:");
    marginFirst += 30;
    if (replyContent.trim() === "") {
        alert("Reply cannot be empty!");
        return;
    }

    const parentComment = comments.find(comment => comment.id === parentId);
    console.log(parentComment);
    if (parentComment) {
        const newReply = new Comment(replyContent, parentId, marginFirst);
        parentComment.replies.push(newReply);

        renderComments();

    }
}

function upvoteComment(commentId) {
    const comment = comments.find(comment => comment.id === commentId);
    if (comment) {
        comment.upvotes += 1;
        comment.updateScore();
        renderComments();
    }
}

function downvoteComment(commentId, commentScore) {
    const comment = comments.find(comment => comment.id === commentId);
    if (comment) {
        if (commentScore > 0) {
            comment.downvotes++;
            comment.updateScore();
            renderComments();
        }
    }
}

function renderComments() {
    const container = document.getElementById("comments-container");
    container.innerHTML = "";

    // Sort comments by timestamp (Oldest First)
    comments.sort((a, b) => a.timestamp - b.timestamp);

    // Generate the comment and reply elements
    comments.forEach(comment => {
        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";
        const profile = document.createElement('div');

        profile.className = 'profile';
        commentDiv.appendChild(profile);
        commentDiv.innerHTML = `
      <p>${comment.content}</p>
      <span>Score: ${comment.score}</span>
      <button onclick="upvoteComment(${comment.id})">Upvote</button>
      <button onclick="downvoteComment(${comment.id},${comment.score})">Downvote</button>
      <button onclick="addReply(${comment.id})">Reply</button>
      <p>All replalys</p>
    `;

        if (comment.replies.length > 0) {

            const repliesContainer = document.createElement("div");



            comment.replies.forEach(reply => {
                const replyDiv = document.createElement("div");
                console.log(marginFirst)
                replyDiv.style.paddingLeft = `${reply.marginFirst}px`



                replyDiv.innerHTML = `
          <p>${reply.content}</p>
          <span>Score: ${reply.score}</span>
          <button  onclick="upvoteComment(${reply.id})">Upvote</button>
          <button onclick="downvoteComment(${reply.id})">Downvote</button>
          <button onclick="addReply(${comment.id})">Reply</button>
        `;
                repliesContainer.appendChild(replyDiv);
            });
            commentDiv.appendChild(repliesContainer);
        }

        container.appendChild(commentDiv);
    });
}

renderComments();