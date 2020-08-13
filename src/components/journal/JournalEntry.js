import React from 'react'

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">

      <div 
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://www.hdnicewallpapers.com/Walls/Big/Cat/Beautiful_Cat_Imge_Download.jpg)'
        }}
      >
      </div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">
          Un nuevo dia
        </p>
        <p className="journal__entry-content">
          Pariatur Lorem ipsum in non est aliquip Lorem do fugiat anim dolor officia esse nisi.
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>

    </div>
  )
}
