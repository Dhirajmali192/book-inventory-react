import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/api";
import BookTable from "../components/BookTable";
import BookForm from "../components/BookForm";
import "../styles/main.css"; 

function Home() {
  const [books, setBooks] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadBooks = async () => {
    setIsLoading(true);
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (error) {
      console.error("Failed to load books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id);
        loadBooks();
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  const clearEdit = () => setEditData(null);

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="home-header">
        <h1 className="home-title">
          <span className="title-icon">📚</span>
          Book Inventory Manager
        </h1>
        <p className="home-subtitle">
          Manage your book collection with ease. Add, edit, or remove books from your inventory.
        </p>
      </header>

      <div className="home-content">
        {/* Form Section */}
        <section className="form-section">
          <div className="section-header">
            <h2 className="section-title">
              {editData ? "Edit Book" : "Add New Book"}
              {editData && (
                <button 
                  className="clear-edit-btn"
                  onClick={clearEdit}
                  title="Cancel edit"
                >
                  × Cancel Edit
                </button>
              )}
            </h2>
            <p className="section-description">
              {editData 
                ? "Update the book details below."
                : "Fill in the form to add a new book to your collection."
              }
            </p>
          </div>
          
          <div className="form-card">
            <BookForm 
              refresh={loadBooks} 
              editData={editData} 
              onCancelEdit={clearEdit}
            />
          </div>
        </section>

        {/* Books Table Section */}
        <section className="table-section">
          <div className="section-header">
            <h2 className="section-title">Book Collection</h2>
            <div className="section-info">
              <p className="section-description">
                {books.length === 0 
                  ? "No books in inventory. Add your first book above." 
                  : `Showing ${books.length} book${books.length !== 1 ? 's' : ''} in your collection.`
                }
              </p>
              {books.length > 0 && (
                <button 
                  className="refresh-btn"
                  onClick={loadBooks}
                  disabled={isLoading}
                >
                  {isLoading ? "Refreshing..." : "⟳ Refresh"}
                </button>
              )}
            </div>
          </div>

          <div className="table-card">
            {isLoading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading books...</p>
              </div>
            ) : books.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📖</div>
                <h3>No Books Yet</h3>
                <p>Your book collection is empty. Add your first book using the form above.</p>
              </div>
            ) : (
              <BookTable
                books={books}
                onDelete={handleDelete}
                onEdit={setEditData}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;