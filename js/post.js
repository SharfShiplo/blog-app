const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
  getPost();
  getPostIdParam();
};

const getPostIdParam = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
};

const getPost = () => {
  const postId = getPostIdParam();
  const postUrl = API_URL + postId;
  fetch(postUrl, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((resData) => {
      buildPost(resData);
    })
    .catch((error) => alert(error.message));
};

const buildPost = (data) => {
  let postDateInform = new Date(parseInt(data.added_date)).toDateString();
  let postImage = `${API_BASE_URL}${data.post_image}`;
  document.querySelector("header").style.backgroundImage = `url(${postImage})`;
  document.getElementById("individual-post-title").innerText = data.title;
  document.getElementById(
    "individual-post-date"
  ).innerText = `Published on ${postDateInform}`;
  document.getElementById("individual-post-content").innerText = data.content;
};
