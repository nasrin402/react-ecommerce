import React from 'react'

export default function CategoryForm({name, setName, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Create category</label>
        <input
          type="text"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <button className="btn btn-raised btn-primary mb-3">Save</button>
      </div>
    </form>
  )
}
