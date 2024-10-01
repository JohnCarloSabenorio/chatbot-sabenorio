import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBMsqhPxPpGqPZg_eroqV2canfFBpDwNpk";
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-pro"
});

export { model };
