import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, doc, getDoc, getDocs, collection, setDoc, where, query } from "firebase/firestore";
export const signup = createAsyncThunk(
    "auth/signup",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
            console.log("✅ User created in auth:", response.user.uid);
            await setDoc(doc(collection(db, "users"), response.user.uid), {
                fullName: userData.fullName,
                email: userData.email,
                userId: response.user.uid,
                role: userData.role
            })
            const userDoc = await getDoc(doc(db, "users", response.user.uid));
            if (userDoc.exists()) {
                return userDoc.data(); 
            } else {
                return rejectWithValue("User data not found in Firestore");
            }
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isloading: false,
        isAuthenticated: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isloading = true
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isloading = false
                state.user = action.payload
                state.isAuthenticated = true
            })
            .addCase(signup.rejected, (state, action) => {
                state.isloading = false
                state.error = action.payload
            })
    }
})