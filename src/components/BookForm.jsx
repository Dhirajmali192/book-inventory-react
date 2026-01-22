import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";
import { addBook, updateBook } from "../services/api";
import "../styles/main.css"; 

const schema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  author: Yup.string()
    .required("Author is required")
    .min(2, "Author name must be at least 2 characters")
    .max(50, "Author name must be less than 50 characters"),
  publisher: Yup.string()
    .required("Publisher is required")
    .min(2, "Publisher name must be at least 2 characters")
    .max(50, "Publisher name must be less than 50 characters"),
  publishedDate: Yup.date()
    .required("Published date is required")
    .max(new Date(), "Published date cannot be in the future"),
  description: Yup.string()
    .max(500, "Description must be less than 500 characters"),
});

function BookForm({ refresh, editData, onCancelEdit }) {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: editData?.title || "",
        author: editData?.author || "",
        publisher: editData?.publisher || "",
        publishedDate: editData?.publishedDate || "",
        description: editData?.description || "",
      }}
      validationSchema={schema}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        try {
          if (editData) {
            await updateBook(editData.id, values);
          } else {
            await addBook(values);
          }
          
          refresh();
          resetForm();
          if (onCancelEdit) onCancelEdit();
        } catch (error) {
          console.error("Error saving book:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, resetForm, touched, errors }) => (
        <Form className="book-form">
          <div className="form-header">
            <h3 className="form-title">
              <span className="form-icon">
                {editData ? "✏️" : "📚"}
              </span>
              {editData ? "Edit Book" : "Add New Book"}
            </h3>
            {editData && onCancelEdit && (
              <button 
                type="button" 
                className="cancel-edit-btn"
                onClick={() => {
                  resetForm();
                  onCancelEdit();
                }}
              >
                ✕ Cancel Edit
              </button>
            )}
          </div>

          <div className="form-grid">
            {/* Title Field */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                <span className="label-icon">📖</span>
                Book Title *
              </label>
              <Field 
                name="title" 
                placeholder="Enter book title" 
                className={`form-input ${touched.title && errors.title ? 'error' : ''}`}
              />
              <ErrorMessage name="title">
                {msg => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Author Field */}
            <div className="form-group">
              <label htmlFor="author" className="form-label">
                <span className="label-icon">✍️</span>
                Author *
              </label>
              <Field 
                name="author" 
                placeholder="Enter author name" 
                className={`form-input ${touched.author && errors.author ? 'error' : ''}`}
              />
              <ErrorMessage name="author">
                {msg => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Publisher Field */}
            <div className="form-group">
              <label htmlFor="publisher" className="form-label">
                <span className="label-icon">🏢</span>
                Publisher *
              </label>
              <Field 
                name="publisher" 
                placeholder="Enter publisher name" 
                className={`form-input ${touched.publisher && errors.publisher ? 'error' : ''}`}
              />
              <ErrorMessage name="publisher">
                {msg => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* Published Date Field */}
            <div className="form-group">
              <label htmlFor="publishedDate" className="form-label">
                <span className="label-icon">📅</span>
                Published Date *
              </label>
              <Field 
                type="date" 
                name="publishedDate" 
                className={`form-input ${touched.publishedDate && errors.publishedDate ? 'error' : ''}`}
              />
              <ErrorMessage name="publishedDate">
                {msg => <div className="error-message">{msg}</div>}
              </ErrorMessage>
            </div>
          </div>

          {/* Description Field */}
          <div className="form-group full-width">
            <label htmlFor="description" className="form-label">
              <span className="label-icon">📝</span>
              Description
              <span className="optional-label">(Optional)</span>
            </label>
            <Field 
              as="textarea" 
              name="description" 
              placeholder="Enter book description (max 500 characters)" 
              rows="4"
              className="form-textarea"
            />
            <ErrorMessage name="description">
              {msg => <div className="error-message">{msg}</div>}
            </ErrorMessage>
            <div className="char-count">
              Max 500 characters
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button 
              type="button" 
              className="secondary-btn"
              onClick={() => {
                resetForm();
                if (editData && onCancelEdit) onCancelEdit();
              }}
              disabled={isSubmitting}
            >
              Clear Form
            </button>
            
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner-small"></span>
                  {editData ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>
                  <span className="btn-icon">
                    {editData ? "💾" : "➕"}
                  </span>
                  {editData ? "Update Book" : "Add Book"}
                </>
              )}
            </button>
          </div>

          {/* Form Status */}
          <div className="form-status">
            <div className="status-info">
              <span className="required-note">* Required fields</span>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BookForm;