// src/lib/pocketbaseClient.js
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090"); // غيّر الـ URL إلى عنوان خادمك
// مثال: pb.authStore.save({ token, model }) أو إعدادات إضافية هنا

export default pb;