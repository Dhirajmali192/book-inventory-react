import { Link } from "react-router-dom";

function BookTable({ books, onDelete, onEdit }) {
  return (
    <div className="book-table-container">
      <div className="table-responsive">
        <table className="book-table">
          <thead>
            <tr>
              <th className="header-title">Title</th>
              <th className="header-author">Author</th>
              <th className="header-actions">Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map(book => (
              <tr key={book.id} className="table-row">
                <td className="cell-title">
                  <div className="title-content">
                    <span className="book-icon">📖</span>
                    <span className="title-text">{book.title}</span>
                  </div>
                </td>
                <td className="cell-author">
                  <span className="author-text">{book.author}</span>
                </td>
                <td className="cell-actions">
                  <div className="action-buttons">
                    <Link 
                      to={`/book/${book.id}`} 
                      className="action-btn view-btn"
                      title="View Details"
                    >
                      <span className="btn-icon">👁️</span>
                      <span className="btn-text">View</span>
                    </Link>
                    
                    <button 
                      onClick={() => onEdit(book)} 
                      className="action-btn edit-btn"
                      title="Edit Book"
                    >
                      <span className="btn-icon">✏️</span>
                      <span className="btn-text">Edit</span>
                    </button>
                    
                    <button 
                      onClick={() => onDelete(book.id)} 
                      className="action-btn delete-btn"
                      title="Delete Book"
                    >
                      <span className="btn-icon">🗑️</span>
                      <span className="btn-text">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Optional: Add a footer with summary */}
      <div className="table-footer">
        <div className="footer-info">
          <span className="book-count">
            Total: <strong>{books.length}</strong> book{books.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BookTable;