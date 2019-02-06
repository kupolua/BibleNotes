export const THE_NOTE = 'THE_NOTE';

export function setNoteAction (note) {
  return {
        type: THE_NOTE,
        payload: note
  };
}
