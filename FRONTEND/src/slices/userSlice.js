import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const userLoginPromiseStatus = createAsyncThunk(
  'user-login',
  async (userCredObj, thunkApi) => {
    try {
      let res = await axios.post('http://localhost:7000/user-api/login', userCredObj)
      if (res.data.message === 'Login successful') {
        // saving to local storage
        sessionStorage.setItem('jwtToken', res.data.token)
        return res.data.user; // return the user data
      } else {
        return thunkApi.rejectWithValue(res.data.message)
      }
    } catch (err) {
      return thunkApi.rejectWithValue({ message: err.message })
    }
  }
);

// relogin after page refresh.......  http://localhost:7000/user-api/get-user/karan
export const userReloginPromise = createAsyncThunk( 'user-relogin',
   async(username,thunkApi)=>{
    try{
        let res = await axios.get(`http://localhost:7000/user-api/get-user/${username}`)
        if(res.data.message==='Relogin Successfull'){
          return res.data.user;
        }else {
          return thunkApi.rejectWithValue(res.data.message)
        }
    }catch (err) {
      return thunkApi.rejectWithValue({ message: err.message })
    }
   }
);

// updating current user 
export const updateUser = createAsyncThunk(
  'update-user', async (updatedObj,thunkApi) =>{
    try{
        let res = await axios.put(`http://localhost:7000/user-api/update-user`,updatedObj);
        if(res.status===200){
            return res.data.payload
        }
        else{
          return thunkApi.rejectWithValue(res.data.message)
        }
    }catch(err){
      return thunkApi.rejectWithValue({ message: err.message })
    }
  }
)
// creating slice
export const userLoginSlice = createSlice({
  name: "user-login-slice",
  initialState: {currentUser:{},userLoginStatus:false,errorMessage:'',isPending:false , cart:0},
  reducers: {
    setUserLogout:(state,action)=>{
      state.userLoginStatus=false;
      state.currentUser={};
      state.errorMessage='';
    }
  },
  extraReducers : builder => builder
  .addCase(userLoginPromiseStatus.pending,(state,action)=>{
    state.isPending = true;
  })
  .addCase(userLoginPromiseStatus.fulfilled,(state,action)=>{
    state.currentUser = action.payload;
    state.userLoginStatus = true;
    state.isPending = false
  })
  .addCase(userLoginPromiseStatus.rejected,(state,action)=>{
    state.errorMessage=action.payload;
    state.isPending = false;
  })
  // extra reducers to handle updateUser
  .addCase(updateUser.fulfilled,(state,action)=>{
    state.currentUser = action.payload
  })
  // extra reducer to relogin
  .addCase(userReloginPromise.fulfilled,(state,action)=>{
    state.currentUser = action.payload
    state.userLoginStatus = true;
  })
});

//export root reducer
export default userLoginSlice.reducer;

//export actions 
export const {setUserLogout} = userLoginSlice.actions;