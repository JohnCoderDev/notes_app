import React from "react";

const Note = ({ title, content, onclick, onedit }) => {
  return (
    <div className="note">
      <div className="note-header">
        <div>
          <p className="note-title" onClick={onedit}>{title}</p>
        </div>
        <div>
          <a href="#" className="close-note" onClick={onclick}>
            x
          </a>
        </div>
      </div>
      <div className="note-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export { Note };
