import { model } from "./mainmodule.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");

document.addEventListener("keydown", function (event) {
  if (document.activeElement !== chatInput) {
    event.preventDefault();
    chatInput.focus();
  } else {
    if (event.key === "Enter") {
      if (chatInput.value.length != 0) {
        chatInput.value = chatInput.value.replace(/\r?\n|\r/g, "");
        APIHandler();
        chatInput.value = "";
      }
    }
  }
});

const getChatResponse = async () => {
  const userText = chatInput.value;
  console.log("user typed:", userText);

  const responseBubble = document.createElement("div");
  responseBubble.classList.add("response-content");
  responseBubble.innerHTML = `      

<div class = "response-inner-body">
<img class = "ai-image" src = "./images/aigis.png">
  <div class = "response-text"></div>
  </div>`;
  const pEle = document.createElement("p");
  try {
    const result = await model.generateContent(userText);
    console.log("Gemini API Response: ");
    const response = await result.response.text();
    pEle.textContent = response.trim();
  } catch (error) {
    pEle.classList.add("error");
    pEle.textContent = "n: " + error;
  }

  responseBubble.querySelector(".response-text").innerHTML = marked.parse(
    pEle.textContent
  );
  chatContainer.appendChild(responseBubble);
  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });
};

const APIHandler = () => {
  const userText = chatInput.value.trim();
  if (!userText) return;

  getChatResponse();
  chatInput.value = "";

  const chatBubble = document.createElement("div");
  chatBubble.classList.add("chat-content");
  chatBubble.innerHTML = `<div class = "chat-inner-body">
            <p class = "user-text">${userText}</p>
<img class = "user-image" src = "./images/makoto.png">

    </div>`;
  chatContainer.appendChild(chatBubble);
  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });
};

sendButton.addEventListener("click", APIHandler);
