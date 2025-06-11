import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase"
export const addProduct = createAsyncThunk(
    'products/add',
    async (productData, { rejectWithValue }) => {
        try {
            const docRef = await addDoc(collection(db, "products"), productData)
            return { ...productData, id: docRef.id }
        } catch (error) {
            return rejectWithValue(error.message);

        }
    }
)
export const getProducts = createAsyncThunk(
    'products/get',
    async (_, { rejectWithValue }) => {
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const products = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return products;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const deleteProduct = createAsyncThunk(
    'products/delete',
    async (id, { rejectWithValue }) => {
        try {
            await deleteDoc(doc(db, "products", id));
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const updateProduct = createAsyncThunk(
    "products/update",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const productRef = doc(db, "products", id);
            await updateDoc(productRef, updatedData);
            return { id, updatedData };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(addProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false
                state.items.push(action.payload)
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = true
                state.error = action.payload
            })
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(product => product.id !== action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const { id, updatedData } = action.payload;
                state.items = state.items.map(item =>
                    item.id === id ? { ...item, ...updatedData } : item
                );
            });

    }
})
export default productSlice.reducer