import { useCallback, useState, useEffect } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/hooks';
import { createUserNote, deleteUserNote, fetchUserNotes, updateUserNote } from './model';
import { Add } from '@mui/icons-material';
import { Note } from '../../shared/components/Note';
import { useNavigate } from 'react-router-dom';


export const Notes: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { notes, loading, error } = useAppSelector((state) => state.notes);
  const [editingNote, setEditingNote] = useState<null | { id: string; title: string; content: string; userId: string }>(null);
  const userRegister = useAppSelector((state) => state.register.user);
  const userLogin = useAppSelector((state) => state.login.user);
  const user = userRegister || userLogin;
  const userId = user ? user.id : null;
  const userName = user ? user.name : null;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/");
    } else {      
      if (userId) {
        dispatch(fetchUserNotes(userId));
      }
    }    
  }, [dispatch, navigate, userId]);

  const handleUpdateNote = useCallback(async () => {

    if (!editingNote || !userId) return;
    
    const updatedNotePayload = {
      noteId: editingNote.id,
      note: {
        title: editingNote.title,
        content: editingNote.content,
        userId: userId
      }
    };

    dispatch(updateUserNote(updatedNotePayload));
    setEditingNote(null);
  }, [dispatch, editingNote, userId]);

  const handleAddNote = useCallback(() => {
    if (!userId) return;
    const newNote = {
      title: '',
      content: '',
      userId
    };
    dispatch(createUserNote(newNote));
  },[dispatch, userId]);

  const handleDeleteNote = useCallback(async (id: string) => {
    dispatch(deleteUserNote(id));
  },[dispatch]);

  return (
    <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} width="100%" gap={2} paddingTop={3} paddingBottom={3}>
      <Box width={{ xs: "100%", sm: "200px" }} display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography variant="h5">{userName}'s Notes</Typography>
        <Button
          variant="outlined"
          sx={{ backgroundColor: "#9c27b0", borderColor: "#9c27b0", color: "white", "&:hover": { opacity: "0.7" } }}
          onClick={handleAddNote}
        >
          <Add />
          Add Note
        </Button>

      </Box>
      <Box flexGrow={1} display="grid" gridTemplateColumns={{ xs: "repeat(auto-fill, 100%)", sm: "repeat(auto-fill, 300px)" }} gap={2}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          notes.slice().reverse().map((note) => (
            <Note
              key={note.id}
              note={note}
              editingNote={editingNote}
              setEditingNote={setEditingNote}
              handleUpdateNote={handleUpdateNote}
              handleDeleteNote={handleDeleteNote}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default Notes;

