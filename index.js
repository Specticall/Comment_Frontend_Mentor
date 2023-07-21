/*
top / parent comment : The comment that sits at the top of replies (main comment)
*/

// Still figuring out how to take care of dates

const users = [
  {
    name: "amyrobson",
    pfp: "images/avatars/image-amyrobson.png",
    password: "amyrobson",
  },
];

const comments = [
  {
    id: 1,
    message:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    date: "1 month ago",
    votes: 12,
    user: {
      pfp: "./images/avatars/image-amyrobson.png",

      name: "amyrobson",
    },
    replies: [],
  },
  {
    id: 2,
    message:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    date: "2 weeks ago",
    votes: 5,
    user: {
      pfp: "./images/avatars/image-maxblagun.png",
      name: "maxblagun",
    },
    replies: [
      {
        id: 3,
        message:
          "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        date: "1 week ago",
        votes: 4,
        user: {
          pfp: "./images/avatars/image-ramsesmiron.png",
          name: "ramsesmiron",
        },
      },
      {
        id: 4,
        message:
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        date: "2 days ago",
        votes: 2,
        user: {
          pfp: "./images/avatars/image-juliusomo.png",
          name: "juliusomo",
        },
      },
    ],
  },
];

let current_user = users[0];
const wrapper_element = document.querySelector(".wrapper");
const main_input = document.querySelector(
  ".comment__input.main"
);
const main_submit = document.querySelector(
  ".comment__submit.main"
);

// Function that finds which id we are currently at. (returns Id with the highest value)
function find_current_id() {
  const reply_ids = comments
    .flatMap((comment) => comment.replies)
    .map((reply) => reply.id);

  const top_ids = comments.map((comment) => comment.id);

  return [...reply_ids, ...top_ids].reduce(
    (max, id) => Math.max(id, max),
    0
  );
}

// Stores the current (highest value) id of the comment object
let current_id = find_current_id();

// function that prints the entire comment (both parent and replies)
function print_comments() {
  wrapper_element.innerHTML = "";
  // loops through the comment object
  comments.map((comment) => {
    // Prints the top container
    const top_html = `<div class="top comment__container" id="id-${comment.id}">
    </div>
    `;
    wrapper_element.insertAdjacentHTML(
      "beforeend",
      top_html
    );

    // appends and prints the top comment on the element
    const top_element = document.querySelector(
      `.comment__container#id-${comment.id}`
    );
    top_element.insertAdjacentHTML(
      "beforeend",
      pick_comment_type(comment)
    );

    // Prints the container for the replies
    top_element.insertAdjacentHTML(
      "beforeend",
      `<div class="reply__container"></div>`
    );

    // Selects the reply container element from the appended element
    const reply_container = document.querySelector(
      `#id-${comment.id} .reply__container`
    );

    // Prints all of the replies
    print_replies(reply_container, comment.id);
  });
}

// function that chooses between the type of comment whether the "us" type or the "other user's"
function pick_comment_type(comment) {
  let main_html = "";
  if (comment.user.name === current_user.name) {
    // Detects that the comment is made by the current logged in user
    main_html = `
    <article class="comment" id="id-${comment.id}">
    <section class="comment__upvote">
      <div class="upvote-btn">
        <button class="upvote-btn plus">+</button>
        <h3 class="upvote-label">${comment.votes}</h3>
        <button class="upvote-btn minus">-</button>
      </div>
    </section>

    <section class="comment__main">
      <header class="comment__header">
        <h2 class="comment__user">
          <img
            src="${comment.user.pfp}"
            class="comment__pfp"
            alt=""
          />
          amyrobson
          <span class="label__you">You</span>
          <p class="comment__date">${comment.date}</p>
        </h2>

        <div class="comment__buttons">
          <button class="header-btn delete" data-id="${comment.id}">
            <i class="bx bxs-trash-alt"></i>
            <p>Delete</p>
          </button>

          <button class="header-btn edit" data-id="${comment.id}">
            <i class="bx bx-pencil"></i>
            <p>Edit</p>
          </button>
        </div>
      </header>
      <!-- ==== COMMENTING ===== -->
      <p class="comment__main-content">
        ${comment.message}
        </p>
      <!-- ===== EDITING ===== -->
      <textarea
        class="comment__input edit hidden"
        required
        spellcheck="false"
      ></textarea>
      <button class="comment__submit edit hidden" data-id="${comment.id}">EDIT</button>
    </section>
  </article>

  <div class="comment__form-wrapper closed">
  <form action="" class="comment__form reply">
  <img
    src="images/avatars/image-amyrobson.png"
    alt=""
    class="form__pfp"
  />
  <textarea
    class="comment__input"
    required
    spellcheck="false"
    placeholder="Add Comment..."
  ></textarea>
  <button class="comment__submit reply" data-id=${comment.id}>SEND</button>
 </form>
 </div>
  `;
  } else {
    // Detects that the comment is NOT made by the current logged in user
    main_html = `
    <article class="comment" id="id-${comment.id}">
      <section class="comment__upvote">
        <div class="upvote-btn">
          <button class="upvote-btn plus">+</button>
          <h3 class="upvote-label">${comment.votes}</h3>
          <button class="upvote-btn minus">-</button>
        </div>
      </section>

      <section class="comment__main">
        <header class="comment__header">
          <h2 class="comment__user">
            <img
              src="${comment.user.pfp}"
              class="comment__pfp"
              alt=""
            />
            ${comment.user.name}
            <p class="comment__date">${comment.date}</p>
          </h2>

          <div class="comment__buttons">
            <button class="header-btn reply" data-id="${comment.id}">
              <i class="bx bx-reply"></i>
              <p>Reply</p>
            </button>
          </div>
        </header>
        <p class="comment__main-content">
          ${comment.message}
        </p>
      </section>
    </article>

    <div class="comment__form-wrapper closed">
    <form action="" class="comment__form reply">
    <img
      src="images/avatars/image-amyrobson.png"
      alt=""
      class="form__pfp"
    />
    <textarea
      class="comment__input"
      required
      spellcheck="false"
      placeholder="Add Comment..."
    ></textarea>
    <button class="comment__submit reply" data-id=${comment.id}>SEND</button>
   </form>
   </div>

    `;
  }
  return main_html;
}

// print the replies of a parent comment
function print_replies(container, parent_id) {
  // Finds the parent element, then map through the replies (while printing on the document!).
  comments
    .find((comment) => comment.id === parent_id)
    .replies.map((reply) => {
      container.insertAdjacentHTML(
        "afterbegin",
        pick_comment_type(reply)
      );
    });
}

// Initial Print
print_comments();

// Initial edit button selection
initiate_edit_btn();

// Initial delete button selection
initiate_delete_btn();

// Initial reply button selection
initiate_reply_btn();

// Finds an comment object based on the given id
function comment_with_id(wanted_id) {
  // Recursive function that traverse the object to find the desired element from an id
  function search_through(comments) {
    let result;
    comments.forEach((comment) => {
      // if the current iteration comment has the id, the return the comment itself
      if (comment.id === wanted_id) result = comment;

      // If replies exists then loop through the replies.
      if (!comment.replies) return;
      result = search_through(comment.replies)
        ? search_through(comment.replies)
        : result;
    });
    return result;
  }

  return search_through(comments);
}

function delete_comment_with_id(wanted_id) {
  function search_through(comments) {
    comments.forEach((comment, i, comments) => {
      // if the current iteration comment has the id, the return the comment itself
      if (comment.id === wanted_id) comments.splice(i, 1);

      // If replies exists then loop through the replies.
      if (!comment.replies) return;
      search_through(comment.replies);
    });
  }

  search_through(comments);
}

// Detects click on the very bottom SEND button
main_submit.addEventListener("click", submit_top_comment);

// function that updates the object for the top comments
function submit_top_comment(e) {
  e.preventDefault();
  update_object(main_input.value);
  // main_input.value = "";
  print_comments();

  current_id++;

  initiate_edit_btn();
  initiate_delete_btn();
  initiate_reply_btn();
}

function update_object(comment) {
  // Creates the new comment object
  const new_comment = {
    id: current_id + 1,
    user: {
      name: current_user.name,
      pfp: current_user.pfp,
    },
    message: comment,
    votes: "0",
    date: "1 day ago",
    replies: [],
  };

  // Pushes the created object into the comments array
  comments.push(new_comment);
}

function update_object_replies(comment, replyTo, parentId) {
  const new_reply = {
    id: current_id + 1,
    user: {
      name: current_user.name,
      pfp: current_user.pfp,
    },
    message: comment,
    votes: "0",
    date: "1 day ago",
    replyTo: replyTo,
  };

  console.log(parentId);
  comment_with_id(Number(parentId)).replies.unshift(
    new_reply
  );
}

// function that prints / reprints a specific comment based on id passed in
function print_specific_comment(comment_id, msg, date) {
  // declares the containing comment element
  const html_element = document.querySelector(
    `#id-${comment_id}`
  );

  // Prints the text
  html_element.querySelector(
    ".comment__main-content"
  ).textContent = msg;

  // if a date exists, print the date
  if (date)
    html_element.querySelector(
      ".comment_date"
    ).textContent = date;
}

// function that toggles the visiblity of the reply input
function toggle_reply_input(comment_id) {
  // the "root" where we are going to "plant" / append the input element;
  const reply_element = document.querySelector(
    `#id-${comment_id}.comment + .comment__form-wrapper`
  );
  reply_element.classList.toggle("closed");
}

// Finds the id for the element's container's / parent
function parentId_of(element_id) {
  let result;
  // If the passed in id is a parent Id then return false
  if (comments.some((comment) => comment.id === element_id))
    return false;

  comments.forEach((parent) => {
    //prettier-ignore
    if (parent.replies.some((reply) => reply.id === element_id))
      result = parent.id;
  });
  return result;
}

// edit comments
function initiate_edit_btn() {
  const edit_btns = document.querySelectorAll(
    ".header-btn.edit"
  );
  edit_btns.forEach((btn) => {
    // Private closed variable that holds the state of each element state whether they are being updated or not and the html element of each component
    // the reason we put the function directly inside the event listener is because we want the isEditing function to present when the hanlder function is "born"
    let isEditing = false;

    const comment_id = btn.dataset.id;

    const selected_comment = document.querySelector(
      `#id-${comment_id}`
    );

    const main_text_content =
      selected_comment.querySelector(
        `.comment__main-content`
      );
    const edit_text_content =
      selected_comment.querySelector(
        `.comment__input.edit`
      );
    const edit_text_btn = selected_comment.querySelector(
      `.comment__submit.edit`
    );

    // finds the object of the comment inside the database (comments array)
    const comment_object = comment_with_id(
      Number(comment_id)
    );

    // Function that toggles between the normal view and edit mode
    function change_comment_mode() {
      main_text_content.classList.toggle("hidden");
      edit_text_content.classList.toggle("hidden");
      edit_text_btn.classList.toggle("hidden");
    }

    // event listener for the edit button itself
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      // change mode to edit
      change_comment_mode();

      // Change the state whenever pressed
      isEditing = !isEditing;

      // sets the text conted of the edited value to the already inputted text
      edit_text_content.value = comment_object.message;
    });

    edit_text_btn.addEventListener("click", (e) => {
      e.preventDefault();
      // Edits the object property of msg with the new edited text
      comment_object.message = edit_text_content.value;

      // print the edited comment
      print_specific_comment(
        comment_object.id,
        edit_text_content.value
      );

      // Change mode to normal view
      change_comment_mode();
    });
  });
}

// delete comments
function initiate_delete_btn() {
  const delete_btns = document.querySelectorAll(
    ".header-btn.delete"
  );

  delete_btns.forEach((btn) => {
    const comment_id = btn.dataset.id;

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      // Deletes the value from the object;
      delete_comment_with_id(Number(comment_id));

      // reprint the pages with the new object
      print_comments();

      // refresh the button selectors
      initiate_delete_btn();
      initiate_reply_btn();
    });
  });
}

// reply comments
function initiate_reply_btn() {
  const reply_btns = document.querySelectorAll(
    ".header-btn.reply"
  );
  const reply_submit_btns = document.querySelectorAll(
    ".comment__submit.reply"
  );
  // const reply_input = document.querySelector(".");

  let isOpen = false;

  // handles the open and closing of the reply inputs
  reply_btns.forEach((btn) => {
    const reply_id = btn.dataset.id;
    const reply_input = document.querySelector(
      `#id-${reply_id}.comment + .comment__form-wrapper .comment__input`
    );
    btn.addEventListener("click", function (e) {
      toggle_reply_input(Number(reply_id));
      isOpen = !isOpen;
      reply_input.focus();
    });
  });

  reply_submit_btns.forEach((btn) => {
    const reply_id = btn.dataset.id;
    const reply_input = document.querySelector(
      `#id-${reply_id}.comment + .comment__form-wrapper .comment__input`
    );
    const parent_id = parentId_of(Number(reply_id));
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      console.log(comment_with_id(Number(reply_id)));

      update_object_replies(
        reply_input.value,
        comment_with_id(Number(reply_id)).user.name,
        parent_id
      );

      main_input.value = "";

      print_comments();

      current_id++;

      initiate_edit_btn();
      initiate_delete_btn();
      initiate_reply_btn();
    });
  });
}
