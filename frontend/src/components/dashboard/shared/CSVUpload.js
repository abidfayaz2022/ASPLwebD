import { useState, useCallback } from 'react';
import { FaUpload, FaFileCsv, FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import styles from '../../styles/csvUpload.module.css';

export default function CSVUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    setError(null);
    setUploadStatus(null);

    if (selectedFile) {
      // Check if file is CSV
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        setError('Please upload a CSV file');
        return;
      }

      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }

      setFile(selectedFile);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvContent = event.target.result;
        const previewLines = csvContent.split('\n').slice(0, 5).join('\n');
        setPreview(previewLines);
      };
      reader.readAsText(selectedFile);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful upload
      setUploadStatus({
        success: true,
        message: 'File uploaded successfully',
        stats: {
          totalRecords: 150,
          processed: 150,
          failed: 0,
          duplicates: 3
        }
      });
    } catch (err) {
      setUploadStatus({
        success: false,
        message: 'Upload failed. Please try again.'
      });
    } finally {
      setUploading(false);
    }
  }, [file]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const event = { target: { files: [droppedFile] } };
      handleFileChange(event);
    }
  }, [handleFileChange]);

  return (
    <div className={styles.csvUploadContainer}>
      <div className={styles.uploadHeader}>
        <h2>Upload Companies CSV</h2>
        <p className={styles.uploadDescription}>
          Upload a CSV file containing company information. The file should include columns for company name, registration number, and other required fields.
        </p>
      </div>

      <div 
        className={`${styles.uploadArea} ${file ? styles.hasFile : ''}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className={styles.fileInput}
          id="csv-upload"
        />
        <label htmlFor="csv-upload" className={styles.uploadLabel}>
          {!file ? (
            <>
              <FaUpload className={styles.uploadIcon} />
              <span>Drag and drop your CSV file here or click to browse</span>
              <span className={styles.uploadHint}>Maximum file size: 5MB</span>
            </>
          ) : (
            <div className={styles.fileInfo}>
              <FaFileCsv className={styles.fileIcon} />
              <div className={styles.fileDetails}>
                <span className={styles.fileName}>{file.name}</span>
                <span className={styles.fileSize}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            </div>
          )}
        </label>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <FaTimesCircle />
          <span>{error}</span>
        </div>
      )}

      {preview && (
        <div className={styles.previewContainer}>
          <h3>File Preview</h3>
          <pre className={styles.previewContent}>{preview}</pre>
        </div>
      )}

      {uploadStatus && (
        <div className={`${styles.uploadStatus} ${uploadStatus.success ? styles.success : styles.error}`}>
          {uploadStatus.success ? <FaCheckCircle /> : <FaTimesCircle />}
          <span>{uploadStatus.message}</span>
          {uploadStatus.stats && (
            <div className={styles.uploadStats}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Total Records:</span>
                <span className={styles.statValue}>{uploadStatus.stats.totalRecords}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Processed:</span>
                <span className={styles.statValue}>{uploadStatus.stats.processed}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Failed:</span>
                <span className={styles.statValue}>{uploadStatus.stats.failed}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Duplicates:</span>
                <span className={styles.statValue}>{uploadStatus.stats.duplicates}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={styles.uploadActions}>
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={styles.uploadButton}
        >
          {uploading ? (
            <>
              <FaSpinner className={styles.spinner} />
              Uploading...
            </>
          ) : (
            'Upload CSV'
          )}
        </button>
      </div>
    </div>
  );
} 