import APIService from "@/helper/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const api = new APIService();

export const getAllRoles = createAsyncThunk("roles/getAllRoles", async () => {
  const res = await api.getAllRoles();
  return res.data.result;
});
export const getRoleById = createAsyncThunk("roles/getRoleById", async (id) => {
  if (id) {
    const res = await api.getRoleById(id);
    return res.data.result;
  } else {
    return null;
  }
});

const roleSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    loading: false,
    selectedRole: null,
    selectLoading: false,
  },

  extraReducers: {
    [getAllRoles.pending]: (state, _) => {
      state.loading = true;
    },

    [getAllRoles.fulfilled]: (state, action) => {
      state.loading = false;
      state.roles = action.payload;
    },
    [getAllRoles.rejected]: (state) => {
      state.loading = false;
    },

    [getRoleById.pending]: (state, _) => {
      state.selectLoading = true;
    },
    [getRoleById.fulfilled]: (state, action) => {
      state.selectLoading = false;
      state.selectedRole = action.payload;
    },
    [getRoleById.rejected]: (state) => {
      state.selectLoading = false;
    },
  },
});

export default roleSlice.reducer;
