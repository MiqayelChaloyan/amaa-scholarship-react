// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Box from "@mui/material/Box";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.css";

function RichTextEditor({ text, setText }) {
  const handleChange = (html) => {
    setText(html);
  };
  return (
    <Box>
      <ReactQuill
        theme="snow"
        placeholder="..."
        modules={RichTextEditor.modules}
        formats={RichTextEditor.formats}
        value={text}
        onChange={handleChange}
      />
    </Box>
  );
}

// Quill modules to attach to editor
RichTextEditor.modules = {};
RichTextEditor.modules.toolbar = [
  [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
  [{ size: [] }][("bold", "italic", "underline", "strike", "blockquote")],
  [({ list: "ordered" }, { list: "bullet" })],
  ["link"],
  ["clean"],
  ["code-block"],
];

// Quill editor formats
RichTextEditor.formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "blockquote",
  "code-block",
  "indent",
  "list",
  "direction",
  "align",
  "link",
  "image",
  "video",
  "formula",
];

// Setting default props for the RichTextEditor
RichTextEditor.defaultProps = {
  setText: "",
  text: "",
};

// Typechecking props for the RichTextEditor
RichTextEditor.propTypes = {
  setText: PropTypes.func,
  text: PropTypes.string,
};

export default RichTextEditor;
