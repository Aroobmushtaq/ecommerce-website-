import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
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
export const login = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await signInWithEmailAndPassword(auth, userData.email, userData.password)
            const user = response.user
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                return userDoc.data();
            } else {
                return rejectWithValue("User data not found in Firestore");
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const fetchCurrentUser = () => (dispatch) => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {

            const docSnap = await getDoc(doc(db, "users", user.uid));
            if (!docSnap.exists()) {
                console.log("No such document!");
                return;
            }
            dispatch(setUser({
                ...docSnap.data(),
            }));
        } else {
            console.log("User is signed out", user);
            dispatch(logout());
        }
    });
    return unsubscribe;

}
export const doLogout = createAsyncThunk(
    "auth/logout",
    async (userData, { rejectWithValue }) => {
        try {
            await auth.signOut();
        } catch (error) {
            return rejectWithValue(error.message);
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
     reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        },
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
            .addCase(login.pending, (state) => {
                state.isloading = false
                state.isAuthenticated = false
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isloading = true
                state.user = action.payload
                state.isAuthenticated = true
            })
            .addCase(login.rejected, (state, action) => {
                state.isloading = false
                state.error = action.payload
            })
    }
})
export default authSlice.reducer;
export const { setUser, logout, setLoading } = authSlice.actions;