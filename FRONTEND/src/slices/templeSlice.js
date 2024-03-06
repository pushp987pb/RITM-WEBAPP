import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const templeLoginPromiseStatus = createAsyncThunk(
  'temple-login',
  async (templeCredObj, thunkApi) => {
    try {
      let res = await axios.post('http://localhost:7000/temple-api/login', templeCredObj)
      if (res.data.message === 'Login successful') {
        // saving to local storage
        sessionStorage.setItem('token', res.data.token)
        return res.data.temple; // returning the temple data
      } else {
        return thunkApi.rejectWithValue(res.data.message)
      }
    } catch (err) {
      return thunkApi.rejectWithValue({ message: err.message })
    }
  }
);

// updating current temple 
export const updateTemple = createAsyncThunk(
  'update-temple', async (updatedObj,thunkApi) =>{
    try{
        let res = await axios.put(`http://localhost:7000/temple-api/update-temple`,updatedObj);
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

export const templeLoginSlice = createSlice({
  name: "temple-login-slice",
  initialState: {currentTemple:{},templeLoginStatus:false,templeLoginError:'',isPending:false},
  reducers: {
    setTempleLogout:(state,action)=>{
      state.templeLoginStatus=false;
      state.currentTemple={}
    }
  },
  // extra reducers to handle promise.....
  extraReducers : builder => builder
  .addCase(templeLoginPromiseStatus.pending,(state,action)=>{
    state.isPending = true;
  })
  .addCase(templeLoginPromiseStatus.fulfilled,(state,action)=>{
    state.currentTemple = action.payload;
    state.templeLoginStatus = true;
    state.isPending = false
  })
  .addCase(templeLoginPromiseStatus.rejected,(state,action)=>{
    state.templeLoginError=action.payload;
    state.isPending = false;
  })
  // extra reducers to handle updateTemple
  .addCase(updateTemple.fulfilled,(state,action)=>{
    state.currentTemple = action.payload
  })
  })

//export root reducer
export default templeLoginSlice.reducer;

//export actions 
export const {setTempleLogout} = templeLoginSlice.actions;
