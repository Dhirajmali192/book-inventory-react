import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById } from "../services/api";
import "../styles/main.css"; 

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await getBookById(id);
        setBook(res.data);
      } catch (err) {
        setError("Failed to load book details. Please try again.");
        console.error("Error fetching book:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBook();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (isLoading) {
    return (
      <div className="book-details-container loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-details-container error">
        <div className="error-icon">❌</div>
        <h2 className="error-title">Error</h2>
        <p className="error-message">{error}</p>
        <button onClick={handleGoBack} className="back-btn">
          ← Back to Books
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-details-container not-found">
        <div className="not-found-icon">📭</div>
        <h2 className="not-found-title">Book Not Found</h2>
        <p className="not-found-message">The book you're looking for doesn't exist.</p>
        <button onClick={handleGoBack} className="back-btn">
          ← Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="book-details-container">
      {/* Header Section */}
      <header className="book-details-header">
        <button onClick={handleGoBack} className="back-btn header-back">
          ← Back
        </button>
        <h1 className="book-title">{book.title}</h1>
        <p className="book-subtitle">Detailed Information</p>
      </header>

      {/* Main Content */}
      <div className="book-details-content">
        {/* Book Cover / Icon */}
        <div className="book-cover-section">
          <div className="book-cover">
            <span className="cover-icon">📚</span>
          </div>
          <div className="book-quick-info">
            <div className="info-item">
              <span className="info-label">ID:</span>
              <span className="info-value">{book.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className="info-status available">Available</span>
            </div>
          </div>
        </div>

        {/* Book Details Card */}
        <div className="details-card">
          <div className="details-section">
            <h3 className="section-title">
              <span className="section-icon">📖</span>
              Book Information
            </h3>
            
            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-label">
                  <span className="detail-icon">✍️</span>
                  Author
                </div>
                <div className="detail-value">{book.author}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <span className="detail-icon">🏢</span>
                  Publisher
                </div>
                <div className="detail-value">{book.publisher || "Not specified"}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <span className="detail-icon">📅</span>
                  Published Date
                </div>
                <div className="detail-value">
                  {book.publishedDate 
                    ? new Date(book.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : "Unknown"
                  }
                </div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <span className="detail-icon">🔠</span>
                  ISBN
                </div>
                <div className="detail-value">{book.isbn || "Not available"}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <span className="detail-icon">📏</span>
                  Pages
                </div>
                <div className="detail-value">{book.pages || "Not specified"}</div>
              </div>
              
              <div className="detail-item">
                <div className="detail-label">
                  <span className="detail-icon">🏷️</span>
                  Category
                </div>
                <div className="detail-value">{book.category || "General"}</div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="description-section">
            <h3 className="section-title">
              <span className="section-icon">📝</span>
              Description
            </h3>
            <div className="description-content">
              {book.description ? (
                <p className="description-text">{book.description}</p>
              ) : (
                <p className="description-empty">No description available for this book.</p>
              )}
            </div>
          </div>

          {/* Additional Info (if available) */}
          {(book.language || book.genre) && (
            <div className="additional-section">
              <h3 className="section-title">
                <span className="section-icon">📊</span>
                Additional Information
              </h3>
              <div className="additional-grid">
                {book.language && (
                  <div className="additional-item">
                    <span className="additional-label">Language:</span>
                    <span className="additional-value">{book.language}</span>
                  </div>
                )}
                {book.genre && (
                  <div className="additional-item">
                    <span className="additional-label">Genre:</span>
                    <span className="additional-value">{book.genre}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button onClick={handleGoBack} className="action-btn secondary-btn">
          ← Back to Inventory
        </button>
        <button 
          onClick={() => navigate(`/edit/${book.id}`)} 
          className="action-btn primary-btn"
        >
          ✏️ Edit Book
        </button>
      </div>
    </div>
  );
}

export default BookDetails;