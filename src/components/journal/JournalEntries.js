import React from 'react'
import { JournalEntry } from './JournalEntry';
import { useSelector } from 'react-redux';

export const JournalEntries = () => {

  const { notes } = useSelector(state => state.notes);
  // const entries = [1,2,3,4,5,6,7,8,9,10];

  if(notes) {
    notes.sort(function(a,b){
      return a.date - b.date
    });
  }

  return (
    <div className="journal__entries">
      
      {
        notes.map( note => (
          <JournalEntry 
            key={ note.id } 
            { ...note }
          />
        ))
      }
    </div>
  )
}
