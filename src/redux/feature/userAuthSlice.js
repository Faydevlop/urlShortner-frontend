import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'


// thunks

export const registerAuth = createAsyncThunk(
    'auth/user/signup',
    async(userData,{rejectWithValue})=>{
        try {
            console.log(userData);
            
            let response = await axios.post(`https://url.moon-cart.shop/signup`,userData)
            return response.data
            
        } catch (error) {
            if(error.response && error.response.data){
                return rejectWithValue(error.response.data);
            }else{
                return rejectWithValue({ message: error.message });
            }
            
        }
    }
)
export const loginAuth = createAsyncThunk(
    'auth/user/login',
    async(userData,{rejectWithValue})=>{
        try {

            let response = await axios.post(`https://url.moon-cart.shop/login`,userData)
            return response.data
            
        } catch (error) {
            if(error.response && error.response.data){
                return rejectWithValue(error.response.data);
            }else{
                return rejectWithValue({ message: error.message });
            }
            
        }
    }
)



// reducers

const userAuthSlice = createSlice({
    name:'userAuth',
    initialState:{
        token:null,
        user:null,
        error:null,
        loading:false,
        isAuthenticated:false
    },
    reducers:{
        logout(state){
            state.user = null
            state.token = null
            state.isAuthenticated = false
        },
        clearError(state) {
            state.error = null;
          },
       
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerAuth.pending,(state)=>{
            state.loading = true
        })
        .addCase(registerAuth.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true;
            state.error = null
            
        })
        .addCase(registerAuth.rejected,(state,action)=>{
            state.loading = false;
            state.user = null
            state.error = action.payload ? action.payload.message : "Registration failed";
        })
        .addCase(loginAuth.pending,(state)=>{
            state.loading = true
        })
        .addCase(loginAuth.fulfilled,(state,action)=>{
            state.loading = false
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true;
            state.error = null
          
        })
        .addCase(loginAuth.rejected,(state,action)=>{
            state.loading = false;
            state.user = null
            state.error = action.payload ? action.payload.message : "Registration failed";
        })
    }
})

export const { clearError } = userAuthSlice.actions;
export const { logout } = userAuthSlice.actions;
export const authReducer = userAuthSlice.reducer;