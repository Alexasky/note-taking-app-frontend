import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createNote, deleteNote, fetchNotes, updateNote } from './api';

export interface INote {
  id: string;
  title: string;
  content: string;
  userId: string;
}

interface NotesState {
  notes: INote[];
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
  error: null,
};

export const fetchUserNotes = createAsyncThunk('notes/fetchNotes', async (userId: string) => {
  const data = await fetchNotes(userId);
  return data;
});

export const createUserNote = createAsyncThunk('notes/createNote', async (note: { title: string, content: string, userId: string }) => {
  const data = await createNote(note);
  return data;
});

export const updateUserNote = createAsyncThunk(
  'notes/updateNote',
  async ({ noteId, note }: { noteId: string, note: { title: string, content: string, userId: string } }) => {
    const data = await updateNote(noteId, note);
    return data;
  }
);

export const deleteUserNote = createAsyncThunk('notes/deleteNote', async (noteId: string) => {
  await deleteNote(noteId);
  return noteId;
});


const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchUserNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notes';
      })
      .addCase(createUserNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateUserNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(deleteUserNote.fulfilled, (state, action) => {        
        if (action.payload) {
          state.notes = state.notes.filter((note) => Number(note.id) !== Number(action.payload));
        }
      });
  },
});

export default notesSlice.reducer;
