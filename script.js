import { model } from "./mainmodule.js";

const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");

// const chatBubble = document.createElement("div");
// chatBubble.classList.add("chat-content");
// chatBubble.innerHTML = `<div class = "chat-inner-body">
//       <img src = "user.png">
//       <p>${userText}</p>
//   </div>`;
//   chatContainer.appendChild(chatBubble);
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

  responseBubble.querySelector(".response-text").appendChild(pEle);
  chatContainer.appendChild(responseBubble);
};

const APIHandler = () => {
  const userText = chatInput.value.trim();
  if (!userText) return;

  getChatResponse();
  chatInput.value = "";

  const chatBubble = document.createElement("div");
  chatBubble.classList.add("chat-content");
  chatBubble.innerHTML = `<div class = "chat-inner-body">
    <div class = "user-text">
            <p>${userText}</p>
    </div>
<img class = "ai-image" src = "./images/aigis.png">

    </div>`;
  chatContainer.appendChild(chatBubble);
};

sendButton.addEventListener("click", APIHandler);
