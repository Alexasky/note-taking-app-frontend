import { Badge, Box, IconButton, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { INote } from '../../features/notes/model';

interface NoteType extends INote {
  isNew?: boolean;
  createdAt?: string;
};

interface NoteProps {
  note: NoteType;
  editingNote: NoteType | null;
  setEditingNote: React.Dispatch<React.SetStateAction<NoteType | null>>;
  handleUpdateNote: () => Promise<void>;
  handleDeleteNote: (id: string) => Promise<void>;
};


export const Note: React.FC<NoteProps> = ({ note, editingNote, setEditingNote, handleUpdateNote, handleDeleteNote }) => {
  const titleRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return 'Invalid date';
    }
    return format(date, 'yyyy-MM-dd');
  };

  useEffect(() => {
    if (note.isNew) {
      titleRef.current?.focus();
    }
  }, [note]);

  return (
    <Box
      key={note.id}
      position="relative"
      padding={2}
      borderRadius={4}
      boxShadow={2}
      display="flex"
      flexDirection="column"
      gap={2}
    >
    {editingNote?.id === note.id ? (
      <TextField
        variant="outlined"
        fullWidth
        value={editingNote.title}
        onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleUpdateNote();
          }
        }}
        placeholder="Enter title..."
        autoFocus
      />
    ) : (
      <Typography variant="h6" onClick={() => setEditingNote(note)} style={{ cursor: 'pointer' }}>
        {note.title || 'Enter title...'}
      </Typography>
    )}

    {editingNote?.id === note.id ? (
      <TextField
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={editingNote.content}
        onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleUpdateNote();
          }
        }}
        placeholder="Enter note content..."
        sx={{ marginBottom: '40px' }}
      />
    ) : (
      <Typography variant="body2" marginBottom="70px" onClick={() => setEditingNote(note)} style={{ cursor: 'pointer' }}>
        {note.content || 'Enter note content...'}
      </Typography>
    )}      
      <Box display="flex" alignItems="center"  position="absolute" bottom={0} left={0} width="calc(100% - 20px)" padding="10px">
        <Box display="flex" gap={1}>
          <IconButton onClick={() => setEditingNote(note)} sx={{ color: "black" }}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteNote(note.id)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </Box>
        <Badge
          badgeContent={formatDate(note.createdAt ? formatDate(note.createdAt) : "")}
          color="secondary"
          showZero
          overlap="rectangular"
          sx={{
              position: 'absolute',
              bottom:30,
              right: 50,
              width: '100px'
            }}
        />
      </Box>
    </Box>
  );
};

