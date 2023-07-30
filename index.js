/*
top / parent comment : The comment that sits at the top of replies (main comment)
*/

const users = [
  {
    name: "amyrobson",
    pfp: "images/avatars/image-amyrobson.png",
    password: "amyrobson",
  },
];

let comments = [
  {
    id: 1,
    message:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "2022-05-29T08:48:49.875Z",
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
    createdAt: "2023-05-29T08:48:49.875Z",
    votes: 5,
    user: {
      pfp: "./images/avatars/image-maxblagun.png",
      name: "maxblagun",
    },
    replies: [
      {
        id: 3,
        message:
          "@maxblagun If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        createdAt: "2023-07-27T08:48:49.875Z",
        votes: 4,
        replyTo: "maxblagun",
        user: {
          pfp: "./images/avatars/image-ramsesmiron.png",
          name: "ramsesmiron",
        },
      },
      {
        id: 4,
        message:
          "@ramsesmiron I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
        createdAt: "2023-07-29T08:48:49.875Z",
        votes: 2,
        reply: "ramsesmiron",
        user: {
          pfp: "./images/avatars/image-juliusomo.png",
          name: "juliusomo",
        },
      },
    ],
  },
];

// Retrieves the saved comment from previous sessions

comments =
  JSON.parse(localStorage.getItem("saved_comments_object"))
    .data || comments;

let current_user = users[0];
const delete_yes_btn = document.querySelector(
  ".card__btn.yes"
);
const delete_no_btn =
  document.querySelector(".card__btn.no");
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
        <button class="upvote-btn plus" data-id="${
          comment.id
        }" data-key="+">+</button>
        <h3 class="upvote-label" id="id-${
          comment.id
        }" data-state="1">${comment.votes}</h3>
        <button class="upvote-btn minus" data-id="${
          comment.id
        }" data-key="-">-</button>
      </div>
    </section>

    <section class="comment__main">
      <header class="comment__header">
        <h2 class="comment__user">
          <div class="comment__user-name">
          <img
            src="${comment.user.pfp}"
            class="comment__pfp"
            alt=""
          />
          amyrobson
          <span class="label__you">You</span>
          </div>
          <p class="comment__date">${days_passed(
            comment.createdAt
          )}</p>
        </h2>

        <div class="comment__buttons">
          <button class="header-btn delete" data-id="${
            comment.id
          }">
            <i class="bx bxs-trash-alt"></i>
            <p>Delete</p>
          </button>

          <button class="header-btn edit" data-id="${
            comment.id
          }">
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
      <button class="comment__submit edit hidden" data-id="${
        comment.id
      }">EDIT</button>
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
  <button class="comment__submit reply" data-id=${
    comment.id
  }>SEND</button>
 </form>
 </div>
  `;
  } else {
    // Detects that the comment is NOT made by the current logged in user
    main_html = `
    <article class="comment" id="id-${comment.id}">
      <section class="comment__upvote">
        <div class="upvote-btn">
          <button class="upvote-btn plus" data-id="${
            comment.id
          }" data-key="+">+</button>
          <h3 class="upvote-label" id="id-${
            comment.id
          }" data-state="1">${comment.votes}</h3>
          <button class="upvote-btn minus" data-id="${
            comment.id
          }" data-key="-">-</button>
        </div>
      </section>

      <section class="comment__main">
        <header class="comment__header">
          <h2 class="comment__user">
            <div class="comment__user-name">
            <img
              src="${comment.user.pfp}"
              class="comment__pfp"
              alt=""
            />
            ${comment.user.name}
            </div>
            <p class="comment__date">${days_passed(
              comment.createdAt
            )}</p>
          </h2>

          <div class="comment__buttons">
            <button class="header-btn reply" data-id="${
              comment.id
            }">
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
    <button class="comment__submit reply" data-id=${
      comment.id
    }>SEND</button>
   </form>
   </div>

    `;
  }
  return label_recipient(main_html);
}

// print the replies of a parent comment
function print_replies(container, parent_id) {
  // Finds the parent element, then map through the replies (while printing on the document!).
  comments
    .find((comment) => comment.id === parent_id)
    .replies.sort((a, b) => b.id - a.id)
    .map((reply) => {
      container.insertAdjacentHTML(
        "afterbegin",
        pick_comment_type(reply, reply.replyTo)
      );
    });
}

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

// delete a comment object from a given id (multi leveled)
function delete_comment_with_id(wanted_id) {
  // works similarly with the comment_with_id() function but have sight differences
  function search_through(comments) {
    comments.forEach((comment, i, comments) => {
      // if the current iteration comment has the id, the return the comment itself
      if (comment.id === wanted_id) comments.splice(i, 1);

      // If replies exists then loop through the replies.
      if (!comment.replies) return;
      search_through(comment.replies);
    });
  }

  // calls the function itself
  search_through(comments);
}

// Detects click on the very bottom SEND button
main_submit.addEventListener("click", submit_top_comment);

// function that updates the object for the top comments
function submit_top_comment(e) {
  e.preventDefault();
  // Add a new comment object that has a message property based of the value of the current textarea input
  update_object(main_input.value);

  // reset the main input textarea and re-initialization of button event handlers.
  comment_input_reset(main_input);
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
    votes: 0,
    createdAt: new Date().toISOString(),
    replies: [],
  };

  // Pushes the created object into the comments array
  comments.push(new_comment);

  save_in_local();
}

// Creates and appends a new object for the reply array of a specified comment object
function update_object_replies(
  comment,
  replyTo,
  parent_object
) {
  const new_reply = {
    id: current_id + 1,
    user: {
      name: current_user.name,
      pfp: current_user.pfp,
    },
    message: comment,
    votes: 0,
    createdAt: new Date().toISOString(),
    replyTo: replyTo,
  };

  parent_object.replies.unshift(new_reply);

  save_in_local();
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

  // Whenever the element id is found inside the reply array of a comment object, then that comment object IS the parent of that id
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

      // Change the state whenever pressed (from true -> false, vice versa)
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

      save_in_local();
    });
  });
}

// delete comments

// defines the selected id of the comment about to be deleted
// This is used to pass the deleted comment section id to the "YES" confirmation button callback function
let selected_id = 0;

function initiate_delete_btn() {
  const delete_btns = document.querySelectorAll(
    ".header-btn.delete"
  );

  delete_btns.forEach((btn) => {
    const comment_id = btn.dataset.id;
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      // Creates a popup that confirms our deletion
      toggle_confirm_deletion();

      selected_id = comment_id;
    });
  });
}

delete_no_btn.addEventListener(
  "click",
  delete_confirm_handler
);

delete_yes_btn.addEventListener(
  "click",
  delete_confirm_handler
);

function delete_confirm_handler() {
  const type = this.dataset.type;
  toggle_confirm_deletion();

  if (type === "no") return;
  delete_comment(selected_id);
}

// Function that gets called if the deletion is confirmed
function delete_comment(comment_id) {
  // console.log("call");
  // Deletes the value from the object;
  delete_comment_with_id(Number(comment_id));

  // reprint the pages with the new object
  print_comments();

  save_in_local();

  // refresh the button selectors
  initiate_delete_btn();
  initiate_reply_btn();
  initiate_upvote_btn();
  initiate_edit_btn();
}

// Function that triggers a confirmation screen, then returns either true or false depending what the user selects
function toggle_confirm_deletion() {
  const delete_popup =
    document.querySelector(".confirmation");
  delete_popup.classList.toggle("closed");
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
    // reply id and selects reply textarea section
    const reply_id = btn.dataset.id;
    const reply_input = document.querySelector(
      `#id-${reply_id}.comment + .comment__form-wrapper .comment__input`
    );

    btn.addEventListener("click", function (e) {
      // Display the input textbox (w/ drop down animation)
      toggle_reply_input(Number(reply_id));

      // Focuses user input on the comment
      reply_input.focus();

      // Whenever we are opening a reply box, then add a @name string for the recipient
      if (!isOpen) {
        concat_recipient(
          comment_with_id(Number(reply_id)).user.name,
          reply_input
        );
      }

      // State switching
      isOpen = !isOpen;
    });
  });

  reply_submit_btns.forEach(reply_submit_handler);

  function reply_submit_handler(btn) {
    const reply_id = btn.dataset.id;
    // Selects the input textarea of the reply
    const reply_input = document.querySelector(
      `#id-${reply_id}.comment + .comment__form-wrapper .comment__input`
    );

    /* Whenever the handler selects the parent element itself, we just 
    pass in the reply_id instead of the parent of the reply id
    because parent id of reply id will return undefined when we select the parent
    */

    const parent_id =
      parentId_of(Number(reply_id)) || Number(reply_id);

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // Adds a new comment object in the replies section of a certain comment object
      update_object_replies(
        reply_input.value,
        comment_with_id(Number(reply_id)).user.name,
        comment_with_id(Number(parent_id))
      );

      // Reset and re-initiate event delegation(? I forgot the name lol)
      comment_input_reset(reply_input);
    });
  }

  // function that concats a string of @recipient (recipient is the reply destination)
  function concat_recipient(recipient_name, reply_input) {
    reply_input.value = `@${recipient_name} `;
  }
}

// vote comments
function initiate_upvote_btn() {
  const plus_btns = document.querySelectorAll(
    ".upvote-btn.plus"
  );
  const minus_btns = document.querySelectorAll(
    ".upvote-btn.minus"
  );

  plus_btns.forEach(event_handler);
  minus_btns.forEach(event_handler);

  function event_handler(btn) {
    const btn_type = btn.dataset.key;

    const btn_id = btn.dataset.id;
    const vote_display = document.querySelector(
      `#id-${btn_id}.upvote-label`
    );

    // Retrieves the comment object from the comments array
    const comment_object = comment_with_id(Number(btn_id));

    const max_vote = comment_object.votes + 1;
    const min_vote = comment_object.votes - 1;
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // Increments or decrement the vote value on the comment object (based on the given dataset of the element)
      comment_object.votes = limit(
        comment_object.votes + (btn_type === "+" ? 1 : -1)
      );

      // Display the vote value on the
      vote_display.textContent =
        comment_object.votes.toString();
    });

    // Limits the amount of upvotes a user can give for each comment (1 upvote OR 1 downvote)
    // Can be translated as min_vote <= vote_input <= max_vote
    function limit(input) {
      if (input <= max_vote && input >= min_vote)
        return input;
      return input < min_vote ? ++input : --input;
    }
  }
}

// Sequences of actions that happens whenever a user submit either a reply ot a comment
function comment_input_reset(input_textarea) {
  input_textarea.value = "";

  print_comments();

  current_id++;

  initiate_edit_btn();
  initiate_delete_btn();
  initiate_reply_btn();
  initiate_upvote_btn();
}

// Returns a comment that has the recipient names labeled with span elements
function label_recipient(message) {
  //prettier-ignore
  const label = (name) => `<span class="highlight"> ${name} </span>`;

  return message
    .split(" ")
    .map((word) => (word[0] === "@" ? label(word) : word))
    .join(" ");
}

// Creates a timer that updates the comment object age
// e.g "a moment ago" -> "1 minute ago" -> "1 hour ago" -> "1 month ago" -> "1 week ago" -> "1 month ago"

//prettier-ignore
function days_passed(iso_string) {
  const today = new Date();
  const date = new Date(iso_string);

  // Converts to minute, hours, days and months;
  const minute_passed = Math.trunc(
    Math.abs(today - date) / (60 * 1000)
  );

  const hours_passed = Math.trunc(minute_passed / 60);

  const days_passed = Math.trunc(hours_passed / 24);

  // Average days / month is 30.437
  const months_passed = Math.trunc(days_passed / 30.437);

  const years_passed = Math.trunc(months_passed / 12);

  const no_s = time => time === 1 ? "" : "s"

  if (minute_passed < 1) return `A few moments ago`;
  if (minute_passed < 60) return `${minute_passed} Minute${no_s(minute_passed)} Ago`;
  if (hours_passed < 24) return `${hours_passed} Hour${no_s(hours_passed)} Ago`;
  if (days_passed < 31) return `${days_passed} Day${no_s(days_passed)} Ago`;
  if (months_passed <= 12) return `${months_passed} Month${no_s(months_passed)} Ago`
  return  `${years_passed} Year${no_s(years_passed)} Ago`
}

// Save data in localStorage
function save_in_local() {
  const save_data = { data: comments };

  localStorage.setItem(
    "saved_comments_object",
    JSON.stringify(save_data)
  );
}

// Initial Print
print_comments();

// Initial edit button selection
initiate_edit_btn();

// Initial delete button selection
initiate_delete_btn();

// Initial reply button selection
initiate_reply_btn();

// Initial vote button selection
initiate_upvote_btn();
