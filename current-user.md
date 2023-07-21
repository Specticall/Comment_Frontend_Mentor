 <!-- === COMMENT CURRENT USER === -->

    <article class="comment">
      <section class="comment__upvote">
        <div class="upvote-btn">
          <button class="upvote-btn plus">+</button>
          <h3 class="upvote-label">0</h3>
          <button class="upvote-btn minus">-</button>
        </div>
      </section>

      <section class="comment__main">
        <header class="comment__header">
          <h2 class="comment__user">
            <img
              src="images/avatars/image-amyrobson.png"
              class="comment__pfp"
              alt=""
            />
            amyrobson
            <span class="label__you">You</span>
            <p class="comment__date">1 month ago</p>
          </h2>

          <div class="comment__buttons">
            <button class="header-btn delete">
              <i class="bx bxs-trash-alt"></i>
              <p>Delete</p>
            </button>

            <button class="header-btn edit">
              <i class="bx bx-pencil"></i>
              <p>Edit</p>
            </button>
          </div>
        </header>
        <!-- ==== COMMENTING ===== -->
        <!-- <p class="comment__main-content">
          <span class="label__username">@maxblagun</span>
          Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Vitae consectetur repellendus
          excepturi amet magni doloribus tenetur,
          voluptatibus ducimus veniam nisi, enim ex deleniti
          odio earum laboriosam error rem id? Excepturi?
        </p> -->
        <!-- ===== EDITING ===== -->
        <textarea
          class="comment__input edit"
          required
          spellcheck="false"
        ></textarea>
        <button class="comment__submit edit">EDIT</button>
      </section>
    </article>
