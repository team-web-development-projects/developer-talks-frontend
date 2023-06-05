import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "./ckeditor.css";

const CkEditor = ({ form, setForm, placeholder }) => {
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        config={{
          placeholder: placeholder,
        }}
        name="content"
        value={form.content}
        data={form.content}
        onChange={(e, editor) => {
          const data = editor.getData();
          setForm({ ...form, ["content"]: data });
        }}
      />
    </>
  );
};

export default CkEditor;
