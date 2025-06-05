import {createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import {db} from "../../config/firebase"
import { buildQueries } from "@testing-library/dom";
export const addProduct=createAsyncThunk(
    'products/add',
    async(productData,{rejectWithValue})=>{
        try{
            const docRef=await addDoc(collection(db,"products"),productData)
            return {...productData,id:docRef.id}
        }catch(error){
            return rejectWithValue(error.message);
            
        }
    }
)
export const productSlice=createSlice({
    name:"products",
    initialState:{
        items:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addProduct.pending,(state)=>{
            state.loading=true
        })
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.loading=false
            state.items.push(action.payload)
        })
        .addCase(addProduct.rejected,(state,action)=>{
            state.loading=true
            state.error=action.payload
        })
    }
})
export default productSlice.reducer