//Doing external JS cause the .html file is so long

//get HTML elements from ID
const commentBox = document.getElementById("commentBox");
const commentInput = document.getElementById("commentInput");
const commentCount = document.getElementById("commentCount");
const noComments = document.getElementById("noComments");

//convert said data into JSON string
//if no comments are stored, will use an empty array
let comments = JSON.parse(localStorage.getItem("comments")) || [];

//function to render comments 
function renderComments() {
    //clear comment box before rendering
    commentBox.innerHTML = "";

    //if there are no comments, display "Be the first to comment!" message and set comment count to 0
    if (comments.length === 0) {
        commentBox.appendChild(noComments);
        commentCount.textContent = 0;
        return;
    }

    //loop through each comment
    comments.forEach((comment, index) => {
        //creates container div for each comment
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");

        //creates a top bar for each comment to hold the user's name and options button
        const topBar = document.createElement("div");
        topBar.classList.add("comment-top");

        //creates a div to show the user's name
        const userDiv = document.createElement("div");
        userDiv.classList.add("comment-user");
        userDiv.textContent = comment.name;
            
        //---------------------CRUD Implememtation: Update and Delete--------------------//

        //creates the 3-dot options button and dropdown menu for edit and delete
        const optionsBtn = document.createElement("button");   
        optionsBtn.textContent = "⋮";
        optionsBtn.classList.add("options-btn");

        //creates the dropdown menu with edit and delete options
        const menu = document.createElement("div");
        menu.classList.add("comment-menu");

        //creates the edit and delete buttons for the dropdown menu
        const editBtn = document.createElement("button");
        editBtn.textContent = "EDIT";

        //delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "DELETE";

        menu.appendChild(editBtn);
        menu.appendChild(deleteBtn);

        optionsBtn.onclick = (e) => {
            e.stopPropagation();
            closeMenus();
            menu.style.display = "block";
        };

        //creates a div to show the comment text
        const textDiv = document.createElement("div");
        textDiv.classList.add("comment-text");
        textDiv.textContent = comment.text;

        //EDIT BUTTON 
        editBtn.onclick = () => {

            //creates a textarea input pre-filled with the current comment text for editing
            const editInput = document.createElement("textarea");
            editInput.value = comment.text;
            editInput.classList.add("edit-input");
                
            //remove autocomplete dropdown on edit input
            editInput.setAttribute("autocomplete", "off");

            //auto-resize the textarea as the user types
            editInput.addEventListener("input", function () {
                this.style.height = "auto";
                this.style.height = this.scrollHeight + "px";
            });

            //creates a post button to save the edited comment
            const postBtn = document.createElement("button");
            postBtn.textContent = "Post";
            postBtn.classList.add("post-btn");

            textDiv.innerHTML = "";
            textDiv.appendChild(editInput);
            textDiv.appendChild(postBtn);

            //when the post button is clicked, it updates the comments array and saves it to localStorage, then re-renders the comments to show the updated text
            postBtn.onclick = () => {
                const updatedText = editInput.value.trim();
                if (updatedText === "") return;

                comments[index].text = updatedText;

                localStorage.setItem("comments", JSON.stringify(comments));
                renderComments();
            };
        };

        //DELETE BUTTON
        deleteBtn.onclick = () => {
            //asks user for confirmation to delete comment
            if (confirm("Are you sure you want to delete this comment?")) {
                //deletes comment using splice
                comments.splice(index, 1);

                //update localStorage and re-render comments
                localStorage.setItem("comments", JSON.stringify(comments));
                renderComments();
            }
        };

        topBar.appendChild(userDiv);
        topBar.appendChild(optionsBtn);

        commentDiv.appendChild(topBar);
        topBar.appendChild(menu);
        commentDiv.appendChild(textDiv);

        commentBox.appendChild(commentDiv);
    });

    //update comment count to the number of comments in the array
    commentCount.textContent = comments.length;
}

//function to close all open dropdown menus when clicking outside of them
function closeMenus() {
    const menus = document.querySelectorAll(".comment-menu");
    menus.forEach(menu => menu.style.display = "none");
}

document.addEventListener("click", closeMenus);

//function to add a new comment
function addComment() {
    //trim from the input value and check if empty, if empty, stops the function
    const text = commentInput.value.trim();
    if (text === "") return;

    //asks use to enter their name, if empty, stops the function
    const name = prompt("Enter your name:");
    if (!name || name.trim() === "") return;

    //creates a new comment object with the user's name and comment text
    const newComment = {
        name: name.trim(),
        text: text
    };

    // then adds (push) it to the comments array and saves it to localStorage
    comments.push(newComment);
    localStorage.setItem("comments", JSON.stringify(comments));

    //clear input feild and re-render comments to show the new comment
    commentInput.value = "";
    renderComments();
}

renderComments();