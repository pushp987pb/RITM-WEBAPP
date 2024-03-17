import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const templeLoginPromiseStatus = createAsyncThunk(
  'temple-login',
  async (templeCredObj, thunkApi) => {
    try {
      let res = await axios.post('http://localhost:7000/temple-api/login', templeCredObj)
      if (res.data.message === 'Login successful') {
        // saving to local storage
        sessionStorage.setItem('jwtToken', res.data.token)
        sessionStorage.setItem('isTemple',true)
        return res.data.temple; // returning the temple data
      } else {
        return thunkApi.rejectWithValue(res.data.message)
      }
    } catch (err) {
      return thunkApi.rejectWithValue({ message: err.message })
    }
  }
);

// relogin after page refresh.......  
export const templeReloginPromise = createAsyncThunk( 'temple-relogin',
   async(templename,thunkApi)=>{
    try{
        let res = await axios.get(`http://localhost:7000/temple-api/get-temple/${templename}`)
        if(res.data.message==='Relogin Successfull'){
          return res.data.temple;
        }else {
          return thunkApi.rejectWithValue(res.data.message)
        }
    }catch (err) {
      return thunkApi.rejectWithValue({ message: err.message })
    }
   }
);

// updating current temple 
export const updateTemple = createAsyncThunk(
  'update-temple', async (updatedObj,thunkApi) =>{
     // fetching  the token from session storage
  const token = sessionStorage.getItem('jwtToken');
  // creating  the headers object
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  try {
    // Make the request, including the headers
    let res = await axios.put('http://localhost:7000/temple-api/update-temple', updatedObj, { headers });
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

// temple slice............
export const templeLoginSlice = createSlice({
  name: "temple-login-slice",
  initialState: {currentTemple:{},templeLoginStatus:false,templeLoginError:'',isPending:false},
  reducers: {
    setTempleLogout:(state,action)=>{
      state.templeLoginStatus=false;
      state.currentTemple={};
      state.templeLoginError='';
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
  // extra reducer to relogin
  .addCase(templeReloginPromise.fulfilled,(state,action)=>{
    state.currentTemple = action.payload
    state.templeLoginStatus = true;
  })
})

//export root reducer
export default templeLoginSlice.reducer;

//export actions 
export const {setTempleLogout} = templeLoginSlice.actions;
