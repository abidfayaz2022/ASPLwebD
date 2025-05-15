import React, { useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';

const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [status, setStatus] = useState('Draft');
  const [coverImage, setCoverImage] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: '',
    editorProps: {
      attributes: {
        class: 'content-editor',
      },
    },
  });

  const handleImageUpload = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting blog:', {
      title,
      content: editor?.getHTML(),
      hashtags,
      status,
      coverImage,
    });
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>📝 Create a New Blog</h2>

      <label style={styles.label}>
        📸 <span style={{ fontWeight: '500' }}>Upload Cover Image</span>
        <input type="file" onChange={handleImageUpload} style={styles.fileInput} />
      </label>

      <input
        type="text"
        placeholder="Enter blog title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />

      <div style={styles.editorBox}>
        <Toolbar editor={editor} />
        <EditorContent editor={editor} style={{ minHeight: '150px' }} />
      </div>

      <input
        type="text"
        placeholder="#finance #growth"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
        style={styles.input}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.select}>
        <option value="Draft">Draft</option>
        <option value="Published">Published</option>
      </select>

      <button type="submit" onClick={handleSubmit} style={styles.button}>
        🚀 Publish Blog
      </button>
    </div>
  );
};

const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const buttonStyle = (isActive) => ({
    padding: '6px 10px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: isActive ? '#fcb900' : '#f9f9f9',
    cursor: 'pointer',
  });

  return (
    <div style={styles.toolbar}>
      <button style={buttonStyle(editor.isActive('bold'))} onClick={() => editor.chain().focus().toggleBold().run()}>
        <b>B</b>
      </button>
      <button style={buttonStyle(editor.isActive('italic'))} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <i>I</i>
      </button>
      <button style={buttonStyle(editor.isActive('underline'))} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <u>U</u>
      </button>
      <button style={buttonStyle(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • List
      </button>
      <button style={buttonStyle(editor.isActive('orderedList'))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1. List
      </button>
      <button style={buttonStyle(false)} onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}>
        Clear
      </button>
    </div>
  );
};

const styles = {
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '30px',
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: '700',
    textAlign: 'center',
    color: '#1f2a44',
  },
  label: {
    display: 'block',
    marginBottom: '15px',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    marginBottom: '20px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
  },
  select: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '25px',
    backgroundColor: '#fffce8',
  },
  button: {
    backgroundColor: '#fcb900',
    color: '#000',
    fontWeight: '600',
    border: 'none',
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    borderRadius: '30px',
    cursor: 'pointer',
  },
  fileInput: {
    display: 'block',
    marginTop: '8px',
  },
  editorBox: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
    padding: '12px',
    minHeight: '180px',
  },
  toolbar: {
    marginBottom: '8px',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
};

export default BlogForm;
