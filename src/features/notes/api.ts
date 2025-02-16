import API from '../../shared/api/api';

export const fetchNotes = async (userId: string) => {
  const response = await API.get(`/notes/${userId}`);
  return response.data;
};

export const createNote = async (note: { title: string; content: string; userId: string }) => {
  const response = await API.post(`/note/create`, note);
  return response.data;
};

export const updateNote = async (noteId: string, note: { title: string; content: string; userId: string }) => {
  const response = await API.put(`/note/${noteId}`, note);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  const response = await API.delete(`/note/${noteId}`);
  return response.data;
};
