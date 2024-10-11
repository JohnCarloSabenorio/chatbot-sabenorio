import getSamplePrompts, { model } from "./mainmodule.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const promptElements = document.querySelectorAll(".chat-prompt");
const promptsContainer = document.querySelector(".prompts-container");
document.addEventListener("DOMContentLoaded", async () => {
  await getSamplePrompts();
  // Add an event listener to each paragraph element
  promptElements.forEach((promptElement, index) => {
    promptElement.addEventListener("click", () => {
      // Define the action to be taken when the paragraph is clicked
      console.log(
        `You clicked on prompt ${index + 1}: ${promptElement.innerText}`
      );
      // You can add any additional actions here, such as highlighting the prompt or displaying more details
      sendDefinedPrompt(promptElement.innerText);
    });
  });
});

document.addEventListener("keydown", function (event) {
  if (document.activeElement !== chatInput) {
    event.preventDefault();
    chatInput.focus();
  } else {
    if (event.key === "Enter") {
      if (chatInput.value.length !== 0) {
        chatInput.value = chatInput.value.replace(/\r?\n|\r/g, ""); // Remove line breaks
        APIHandler(); // Call APIHandler on 'Enter'
      }
    }
  }
});


// Modify getChatResponse to accept a parameter
const getChatResponse = async (userText) => {
  console.log("user typed:", userText); // Log the user text being processed

  const responseBubble = document.createElement("div");
  responseBubble.classList.add("response-content");
  responseBubble.innerHTML = `      
    <div class="response-inner-body">
      <img class="ai-image" src="./images/aigis.png">
      <div class="response-text"></div>
    </div>`;
  const pEle = document.createElement("p");
  try {
    const result = await model.generateContent(userText); // Use the provided userText
    console.log("Gemini API Response: ");
    const response = await result.response.text();
    pEle.textContent = response.trim();
  } catch (error) {
    pEle.classList.add("error");
    pEle.textContent = "Error: " + error; // Changed the error message for clarity
  }

  responseBubble.querySelector(".response-text").innerHTML = marked.parse(pEle.textContent);
  chatContainer.appendChild(responseBubble);
  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });
};


const APIHandler = () => {
  const userText = chatInput.value.trim(); // Get trimmed user input
  if (!userText) return; // Exit if no input

  // Call getChatResponse with userText
  getChatResponse(userText);
  chatInput.value = ""; // Clear the chat input

  // Create a chat bubble for the user input
  const chatBubble = document.createElement("div");
  chatBubble.classList.add("chat-content");
  chatBubble.innerHTML = `<div class="chat-inner-body">
            <p class="user-text">${userText}</p>
            <img class="user-image" src="./images/makoto.png">
    </div>`;
  chatContainer.appendChild(chatBubble);
  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });
};

function sendDefinedPrompt(thePrompt) {
  const userText = thePrompt; // thePrompt is passed directly from the clicked prompt
  if (!userText) return;

  // Call getChatResponse with userText instead of chatInput.value
  getChatResponse(userText);
  
  // Clear chat input and create chat bubble for defined prompt
  chatInput.value = ""; // Clear the input field if necessary

  const chatBubble = document.createElement("div");
  chatBubble.classList.add("chat-content");
  chatBubble.innerHTML = `<div class="chat-inner-body">
            <p class="user-text">${userText}</p>
            <img class="user-image" src="./images/makoto.png">
    </div>`;
  chatContainer.appendChild(chatBubble);
  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });
  promptsContainer.style.display = "none";
}

sendButton.addEventListener("click", APIHandler);
