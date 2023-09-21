import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { parseDataFile } from "../../services/dataParser";

export interface AppState {
  operaDataFile: File | null;
  rosterEmployeesFile: File | null;
  operaData: any;
  rosterEmployeesData: any;
  rosterTemplate: any;
  rosterShifts: any;
  currentDate: Date;
}

const initialState: AppState = {
  operaDataFile: null,
  rosterEmployeesFile: null,
  operaData: null,
  rosterEmployeesData: null,
  rosterTemplate: null,
  rosterShifts: null,
  currentDate: new Date(),
};

export const setOperaFileAction = createAsyncThunk(
  "app/setOperaFileAction",
  async (file: File | undefined, thunkAPI) => {
    if (!file) return null;
    const data = await parseDataFile(file);
    return { file, data };
  }
);

export const setRosterEmployeesFileAction = createAsyncThunk(
  "app/setRosterEmployeesFileAction",
  async (file: File | undefined, thunkAPI) => {
    if (!file) return null;
    const data = await parseDataFile(file);
    return { file, data };
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setRosterEmployeesFile: (state, action: PayloadAction<File>) => {
      state.rosterEmployeesFile = action.payload;
    },
    setOperaData: (state, action: PayloadAction<any>) => {
      state.operaData = action.payload;
    },
    clearRosterData: (state) => {
      state.operaData = initialState.operaData;
      state.operaDataFile = initialState.operaDataFile;
      state.rosterEmployeesFile = initialState.rosterEmployeesFile;
      state.rosterEmployeesData = initialState.rosterEmployeesData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setOperaFileAction.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.operaDataFile = action.payload?.file as File;
      state.operaData = action.payload?.data;
    });
    builder.addCase(setRosterEmployeesFileAction.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.rosterEmployeesFile = action.payload?.file as File;
      state.rosterEmployeesData = action.payload?.data;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setRosterEmployeesFile, setOperaData, clearRosterData } =
  appSlice.actions;

export default appSlice.reducer;
