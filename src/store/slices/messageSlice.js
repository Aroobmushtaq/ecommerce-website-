import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { addDoc, getDocs, collection, Timestamp,deleteDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";
export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async (id, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, "messages", id));
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// 🔸 Thunk to fetch messages
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    return messages;
  }
);

// 🔸 Thunk to send a message
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ userId, userName, email, message }) => {
    try {
      const docRef = await addDoc(collection(db, "messages"), {
        userId: userId || "unknown",
        userName: userName?.trim() || "Guest",
        email: email || "noemail@example.com",
        message: message || "",
        createdAt: Timestamp.now(),
      });
      toast.success("Message sent successfully");
      return {
        id: docRef.id,
        userId,
        userName: userName?.trim() || "Guest",
        email,
        message,
        createdAt: Timestamp.now(),
      };
    } catch (error) {
      toast.error("Failed to send message");
      throw error;
    }
  }
);

// 🔸 Slice definition
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    items: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload); // add new message
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // set all messages
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
  state.items = state.items.filter(msg => msg.id !== action.payload);
})
  },
});

export default messageSlice.reducer;
