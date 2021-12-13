import React from 'react';

const CategoryForm = ({name, setName, handleSubmit}) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label className='pb-2'>Name</label>
            <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)} autoFocus required />
            <button className="btn btn-outline-primary mt-2" type="submit">Save</button>

        </div>
    </form>
)
    

export default CategoryForm;